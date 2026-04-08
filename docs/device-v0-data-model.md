# Device v0 Data Model

## 1. Scope

This document defines the local data model for the first offline device release:

- hardware: **M5Stack PaperS3**
- firmware: **0.1.0**
- learning pack: **pack-pre-n5.v1**

The goal is to keep the device data model:

- offline-first
- simple
- robust
- easy to sync
- easy to debug

---

## 2. Design principles

The v0 device data model should follow these rules:

- one installed pack at a time
- local progress must survive device restart
- local study must not depend on internet access
- sync payloads should be append-friendly
- content data and user state data must be separated
- files should be understandable by humans when inspected

For v0, JSON-based storage is acceptable and preferred for simplicity.

---

## 3. Local storage categories

The device stores four major categories of data:

### 3.1 Pack data

Static learning content for the current stage.

Examples:

- manifest
- lessons
- kana items
- vocab items
- quiz definitions
- pack rules

### 3.2 User progress data

Mutable local state for current learner progress.

Examples:

- completed lessons
- item mastery state
- best quiz score
- stage progress counters

### 3.3 Local history data

Recent activity records kept locally.

Examples:

- quiz history
- recent mistakes
- recent sessions

### 3.4 Sync queue data

Events that must be uploaded later.

Examples:

- lesson completed event
- quiz finished event
- mastery update event
- pack install event

---

## 4. Recommended file layout

Recommended device-local structure:

```text
/device
  /pack
    manifest.json
    lessons.json
    kana.json
    vocab.json
    quizzes.json
    rules.json
  /state
    progress.json
    review_state.json
    quiz_history.json
    sync_queue.json
    device_meta.json
```

This structure keeps:

- pack content isolated
- learner state isolated
- sync responsibilities visible

---

## 5. Pack data files

## 5.1 `manifest.json`

Purpose:

- identify the currently installed pack
- define top-level metadata

Suggested shape:

```json
{
  "pack_id": "pack-pre-n5",
  "pack_version": "v1",
  "stage": "pre-n5",
  "title": "Pre-N5 Foundation Pack",
  "firmware_min_version": "0.1.0",
  "estimated_total_sessions": 20,
  "content_version": 1
}
```

### Fields

- `pack_id`: logical pack identifier
- `pack_version`: content version
- `stage`: learning stage
- `title`: display title
- `firmware_min_version`: minimum supported firmware
- `estimated_total_sessions`: optional UX hint
- `content_version`: internal pack build version

---

## 5.2 `lessons.json`

Purpose:

- define learning structure
- control module ordering
- declare unlock rules

Suggested record shape:

```json
{
  "lesson_id": "hira-a-row",
  "title": "Hiragana A Row",
  "module": "hiragana",
  "type": "kana_row",
  "order": 1,
  "estimated_minutes": 5,
  "unlock_rule": null,
  "content_refs": ["kana:a-row"]
}
```

---

## 5.3 `kana.json`

Purpose:

- define kana learning items

Suggested record shape:

```json
{
  "item_id": "hira-a",
  "kana": "あ",
  "romanization": "a",
  "script_type": "hiragana",
  "group": "a-row",
  "sample": "あさ"
}
```

Optional future fields:

- `stroke_ref`
- `audio_ref`

---

## 5.4 `vocab.json`

Purpose:

- define small vocabulary units

Suggested record shape:

```json
{
  "item_id": "greeting-ohayou",
  "word": "おはよう",
  "reading": "ohayou",
  "meaning": "good morning",
  "category": "greetings"
}
```

---

## 5.5 `quizzes.json`

Purpose:

- define small offline quiz items

Suggested record shape:

```json
{
  "quiz_id": "kana-q-001",
  "quiz_type": "kana_to_romanization",
  "prompt": "あ",
  "answer": "a",
  "options": ["a", "i", "u", "e"]
}
```

---

## 5.6 `rules.json`

Purpose:

- define stage completion thresholds
- define simple local progression rules

Suggested shape:

```json
{
  "completion_rules": {
    "hiragana_mastery_min": 90,
    "katakana_mastery_min": 85,
    "vocab_mastery_min": 80,
    "quiz_pass_count_min": 3,
    "mixed_quiz_best_score_min": 80
  }
}
```

---

## 6. State data files

## 6.1 `progress.json`

Purpose:

- store current local progress snapshot
- support quick page rendering without replaying history

Suggested shape:

```json
{
  "stage": "pre-n5",
  "pack_id": "pack-pre-n5",
  "pack_version": "v1",
  "completed_lessons": ["hira-a-row"],
  "opened_lessons": ["hira-a-row", "hira-ka-row"],
  "module_progress": {
    "hiragana": 12,
    "katakana": 0,
    "starter_reading": 0,
    "survival_vocab": 5
  },
  "best_scores": {
    "kana": 80,
    "mixed": 60
  },
  "current_streak": 2,
  "last_active_at": "2026-04-08T21:00:00Z"
}
```

### Why this file exists

This file is the fast local summary for:

- Home
- Progress
- module cards
- unlock checks

It is the device's main derived state snapshot.

---

## 6.2 `review_state.json`

Purpose:

- track item mastery and weak areas

Suggested shape:

```json
{
  "items": {
    "hira-a": {
      "state": "mastered",
      "correct_count": 4,
      "wrong_count": 0,
      "last_seen_at": "2026-04-08T20:30:00Z"
    },
    "kata-a": {
      "state": "learning",
      "correct_count": 1,
      "wrong_count": 2,
      "last_seen_at": "2026-04-08T20:40:00Z"
    }
  }
}
```

### Suggested states

- `new`
- `learning`
- `review`
- `mastered`

### Why separate from progress

This file changes often and is item-level.
Separating it keeps `progress.json` cleaner.

---

## 6.3 `quiz_history.json`

Purpose:

- store recent quiz attempts locally

Suggested shape:

```json
[
  {
    "quiz_session_id": "quiz-20260408-001",
    "quiz_type": "kana",
    "score": 8,
    "total": 10,
    "created_at": "2026-04-08T20:45:00Z"
  }
]
```

### Retention suggestion

For v0, keep only recent history, for example:

- last 20 quiz attempts

Long-term analytics belong in the cloud, not on the device.

---

## 6.4 `sync_queue.json`

Purpose:

- store events not yet uploaded to backend

Suggested shape:

```json
[
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
```

### Rules

- queue items should only be removed after successful server acknowledgment
- queue should survive restarts
- queue should stay append-only for simplicity

---

## 6.5 `device_meta.json`

Purpose:

- store device-level metadata needed for sync and diagnostics

Suggested shape:

```json
{
  "device_id": "papers3-001",
  "firmware_version": "0.1.0",
  "current_pack_id": "pack-pre-n5",
  "current_pack_version": "v1",
  "last_sync_at": "2026-04-08T19:00:00Z",
  "sync_status": "idle"
}
```

Suggested sync status values:

- `idle`
- `pending`
- `syncing`
- `success`
- `failed`

---

## 7. Data ownership rules

To avoid confusion, ownership should be defined clearly.

### Device owns locally

- currently installed pack files
- local progress snapshot
- local review state
- unsynced queue
- recent local quiz history

### Cloud owns centrally

- canonical user account
- global stage unlock state
- long-term history
- all-stage roadmap
- pack availability metadata
- final stage completion authority

### Important rule

The device may estimate completion locally,
but the web app/backend remains the final authority for stage unlocks.

---

## 8. Suggested local event types

For v0, keep event types minimal.

Recommended event types:

- `lesson_opened`
- `lesson_completed`
- `quiz_finished`
- `item_mastered`
- `daily_session_completed`
- `pack_installed`

These are enough to support:

- progress sync
- dashboard updates
- stage completion checks

---

## 9. Write behavior rules

### 9.1 During lesson open

Update:

- `progress.json` opened lessons
- optionally `sync_queue.json` add `lesson_opened`

### 9.2 During lesson complete

Update:

- `progress.json` completed lessons
- `progress.json` module progress
- `sync_queue.json` add `lesson_completed`

### 9.3 During quiz finish

Update:

- `quiz_history.json`
- `progress.json` best score if improved
- `review_state.json` item stats
- `sync_queue.json` add `quiz_finished`

### 9.4 During successful sync

Update:

- remove acknowledged queue items
- update `device_meta.json.last_sync_at`
- update `device_meta.json.sync_status`

---

## 10. Sync payload direction

The device does not need to upload raw local files.

Instead, it should transform local state into API payloads.

### Example lesson completion payload

```json
{
  "device_id": "papers3-001",
  "user_id": "user-001",
  "stage": "pre-n5",
  "events": [
    {
      "event_type": "lesson_completed",
      "lesson_id": "hira-a-row",
      "created_at": "2026-04-08T20:10:00Z"
    }
  ]
}
```

### Example quiz payload

```json
{
  "user_id": "user-001",
  "quiz_type": "kana",
  "score": 8,
  "total": 10
}
```

---

## 11. Failure behavior

If sync fails:

- keep queue entries unchanged
- set sync status to `failed`
- allow offline use to continue
- retry only when the user triggers sync or when allowed by later firmware logic

The device should never block learning because sync failed.

---

## 12. Data model success criteria

The v0 device data model is successful if it allows the device to:

1. boot and show current stage data without internet
2. continue studying after restart without losing progress
3. record quizzes locally
4. surface weak items on Review page
5. upload progress later without ambiguity
6. remain simple enough to inspect manually during development

---

## 13. Future evolution path

Later versions may replace or extend JSON storage with:

- compact binary pack files
- SQLite or embedded structured storage
- compressed pack assets
- stronger sync reconciliation metadata

But v0 should not optimize prematurely.

For v0, readable JSON is the correct tradeoff.
