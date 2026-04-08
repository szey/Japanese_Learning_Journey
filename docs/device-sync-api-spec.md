# Device Sync API Spec

## 1. Design method

This API spec is designed from first principles.

The goal is not to imitate a typical REST checklist.
The goal is to support the actual irreducible needs of this product:

- the device must work offline
- the device must study one stage pack at a time
- the web app remains the master console
- the backend remains the source of sync authority
- the device must upload progress later without losing meaning
- stage unlock authority must remain in the cloud

From those facts, the sync API only needs to solve four essential jobs:

1. identify device state
2. upload local events
3. ask whether a new pack is available
4. fetch pack metadata required for safe upgrade

Everything else is secondary.

---

## 2. First-principles requirements

### 2.1 Requirement A — offline study must continue without network

Therefore:

- the device cannot depend on live server state for every lesson
- sync must be event-based, not session-locked
- local queue replay must be possible

### 2.2 Requirement B — the web app is the master console

Therefore:

- stage unlock authority belongs to the backend
- the device may estimate local completion, but cannot self-authorize next-stage promotion

### 2.3 Requirement C — the device runs one pack at a time

Therefore:

- sync must always include current pack identity
- pack compatibility must be explicit
- upgrade responses must be simple and safe

### 2.4 Requirement D — the device is resource-constrained

Therefore:

- payloads should be small
- full file upload should be avoided in v0
- sync should use small event batches and compact metadata

---

## 3. Sync model summary

The device sync model has two layers.

### Layer 1 — event upload

The device sends local learning events to the backend.

Examples:

- lesson opened
- lesson completed
- quiz finished
- item mastered
- daily session completed

### Layer 2 — device state check

The device asks the backend:

- am I allowed to keep using this pack
- is a new pack available
- what pack metadata should I know about

This keeps sync simple and avoids overdesign.

---

## 4. Authentication model for v0

For v0, the simplest acceptable model is:

- device identifies itself with `device_id`
- request includes `user_id`
- user authentication may initially be validated by the web app flow and backend trust model

For later versions, device sync should move toward:

- authenticated device token
- or validated user JWT / session-derived identity

But v0 should not block on perfect device auth design.

---

## 5. Required endpoints

The minimum viable sync API should contain exactly four device-facing endpoints.

### 5.1 `GET /api/device/status`

### Purpose

Return current server-understood state for the device and learner relationship.

### Why this exists

From first principles, the device needs a single truth check page:

- who am I linked to
- what pack am I supposed to be on
- am I behind
- is sync needed

### Request

Query parameters:

- `device_id`
- `user_id`

Example:

```http
GET /api/device/status?device_id=papers3-001&user_id=user-001
```

### Response example

```json
{
  "device_id": "papers3-001",
  "user_id": "user-001",
  "firmware_min_version": "0.1.0",
  "current_stage": "pre-n5",
  "expected_pack_id": "pack-pre-n5",
  "expected_pack_version": "v1",
  "pack_upgrade_available": false,
  "next_stage_unlocked": false,
  "last_server_sync_at": "2026-04-08T20:00:00Z"
}
```

### Notes

This endpoint is read-only and lightweight.
It supports the device Sync page and quick health checks.

---

### 5.2 `POST /api/device/upload-events`

### Purpose

Upload locally queued learning events.

### Why this exists

From first principles, the device should not upload full local files.
It should upload meaningful events that the backend can apply.

This keeps:

- payloads smaller
- retries simpler
- local queue append-only
- backend reconciliation easier

### Request example

```json
{
  "device_id": "papers3-001",
  "user_id": "user-001",
  "firmware_version": "0.1.0",
  "pack_id": "pack-pre-n5",
  "pack_version": "v1",
  "events": [
    {
      "event_id": "evt-001",
      "event_type": "lesson_completed",
      "created_at": "2026-04-08T20:10:00Z",
      "payload": {
        "lesson_id": "hira-a-row"
      }
    },
    {
      "event_id": "evt-002",
      "event_type": "quiz_finished",
      "created_at": "2026-04-08T20:45:00Z",
      "payload": {
        "quiz_type": "kana",
        "score": 8,
        "total": 10
      }
    }
  ]
}
```

### Response example

```json
{
  "accepted_event_ids": ["evt-001", "evt-002"],
  "rejected_event_ids": [],
  "server_time": "2026-04-08T21:00:00Z",
  "stage_completion_changed": false,
  "pack_upgrade_available": false
}
```

### Rules

- backend must treat `event_id` as idempotent if possible
- duplicate event replay should not corrupt state
- device removes only accepted events from local queue
- rejected events should remain inspectable locally

### Event types for v0

Allowed event types:

- `lesson_opened`
- `lesson_completed`
- `quiz_finished`
- `item_mastered`
- `daily_session_completed`
- `pack_installed`

---

### 5.3 `GET /api/device/pack-availability`

### Purpose

Tell the device whether it should stay on the current pack or prepare for an upgrade.

### Why this exists

From first principles, pack transition is a major product event.
The device needs a clean answer, not an implicit guess from dashboard data.

### Request

Query parameters:

- `device_id`
- `user_id`
- `current_pack_id`
- `current_pack_version`

Example:

```http
GET /api/device/pack-availability?device_id=papers3-001&user_id=user-001&current_pack_id=pack-pre-n5&current_pack_version=v1
```

### Response example — no update

```json
{
  "pack_upgrade_available": false,
  "current_stage": "pre-n5",
  "current_pack_id": "pack-pre-n5",
  "current_pack_version": "v1"
}
```

### Response example — update available

```json
{
  "pack_upgrade_available": true,
  "current_stage": "pre-n5",
  "next_stage": "n5",
  "target_pack_id": "pack-n5",
  "target_pack_version": "v1",
  "reason": "stage_unlocked"
}
```

### Notes

This endpoint does not need to return the full pack content.
It only answers the upgrade question.

---

### 5.4 `GET /api/device/pack-manifest`

### Purpose

Return metadata required for a safe pack install or update.

### Why this exists

From first principles, content transition should be controlled and explicit.
The device needs a small authoritative manifest before installing or activating a new pack.

### Request

Query parameters:

- `pack_id`
- `pack_version`

Example:

```http
GET /api/device/pack-manifest?pack_id=pack-n5&pack_version=v1
```

### Response example

```json
{
  "pack_id": "pack-n5",
  "pack_version": "v1",
  "stage": "n5",
  "title": "N5 Foundation Pack",
  "firmware_min_version": "0.1.0",
  "content_version": 1,
  "estimated_total_sessions": 28,
  "download_url": "https://example.com/packs/pack-n5-v1.zip",
  "checksum": "sha256:abc123"
}
```

### Notes

In v0, `download_url` may remain conceptual if pack delivery is manual.
But the manifest contract should still exist now.

---

## 6. Optional endpoints not required for v0

These may be useful later, but should not be mandatory now:

- `POST /api/device/register`
- `POST /api/device/heartbeat`
- `GET /api/device/review-items`
- `GET /api/device/daily-task-snapshot`
- `POST /api/device/error-log`

The system can work without them in the first meaningful version.

---

## 7. Event schema

The core v0 event object should follow this shape:

```json
{
  "event_id": "evt-001",
  "event_type": "lesson_completed",
  "created_at": "2026-04-08T20:10:00Z",
  "payload": {}
}
```

### Required fields

- `event_id`
- `event_type`
- `created_at`
- `payload`

### Event payload examples

#### lesson_opened

```json
{
  "lesson_id": "hira-a-row"
}
```

#### lesson_completed

```json
{
  "lesson_id": "hira-a-row"
}
```

#### quiz_finished

```json
{
  "quiz_type": "kana",
  "score": 8,
  "total": 10
}
```

#### item_mastered

```json
{
  "item_id": "hira-a"
}
```

#### daily_session_completed

```json
{
  "session_date": "2026-04-08"
}
```

#### pack_installed

```json
{
  "pack_id": "pack-pre-n5",
  "pack_version": "v1"
}
```

---

## 8. Idempotency rules

From first principles, unstable connectivity means duplicate delivery is normal.

Therefore:

- every event should carry a unique `event_id`
- backend should ignore exact duplicates safely
- device should not assume upload success until acknowledged
- retry must be allowed without state corruption

This is one of the most important rules in the whole sync system.

---

## 9. Error model

### Standard error response

```json
{
  "error": "message here"
}
```

### v0 error categories

Recommended categories:

- invalid request
- unknown device
- pack mismatch
- unsupported firmware
- unauthorized
- server error

### Device behavior on error

If an API call fails, the device should:

- keep local queue unchanged
- display simple sync error state
- remain fully usable for current offline study

The backend must never cause the current pack to become unusable just because sync failed.

---

## 10. Pack mismatch handling

From first principles, the backend must know if the device is uploading events from the wrong pack.

Example case:

- user is already advanced to N5 in cloud
- device is still on `pack-pre-n5.v1`

Recommended rule:

- backend still accepts valid historical progress uploads
- backend returns `pack_upgrade_available = true`
- backend does not auto-reject legitimate late sync from previous stage unless policy requires it later

The product should be resilient, not brittle.

---

## 11. Minimum backend data needed to support this API

The backend must be able to store or derive:

- user id
- current cloud stage
- current expected pack id/version
- device metadata
- accepted event ids or equivalent duplicate protection
- lesson completion state
- quiz history
- stage unlock state

This does not require a huge sync engine for v0.
It requires disciplined state ownership.

---

## 12. Why this API set is sufficient

This API set is sufficient because it directly solves the only four questions the device actually has:

1. Who am I and what state does the server think I am in?
2. How do I upload what I did offline?
3. Should I stay on this pack or upgrade?
4. If I should upgrade, what is the target pack metadata?

Anything beyond that can be added later.

That is the first-principles boundary.

---

## 13. Suggested implementation order

### Phase 1

Implement:

- `GET /api/device/status`
- `POST /api/device/upload-events`

This is enough to validate basic offline-to-cloud flow.

### Phase 2

Implement:

- `GET /api/device/pack-availability`

This is enough to validate stage transition logic.

### Phase 3

Implement:

- `GET /api/device/pack-manifest`

This is enough to validate controlled pack installation and upgrade.

---

## 14. Design principle summary

The sync API should not try to mirror the whole product.
It should only move the smallest meaningful truths between device and cloud.

In this system, those truths are:

- device identity
- current pack identity
- learning events
- upgrade availability
- pack metadata

That is enough to make the offline terminal real.
