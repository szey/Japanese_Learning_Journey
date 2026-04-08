# Stage Architecture Spec

## 1. Product definition

Japanese Learning Journey is a dual-surface learning system:

- **Web app** = master console
- **E-ink device** = focused offline terminal

The web app manages the full learning roadmap, account state, unlock logic, and cloud data.
The e-ink device runs one stage at a time as a low-distraction offline study companion.

---

## 2. Core architecture

### 2.1 Web app responsibilities

The web app is the primary system of record.

It is responsible for:

- user account and authentication
- overall roadmap from Pre-N5 to N1
- lesson browsing and explanations
- stage completion rules
- unlock logic for the next stage
- sync center for device state
- cloud progress and analytics
- pack availability and update prompts

### 2.2 Device responsibilities

The e-ink device is not the full application.
It is an offline-first companion terminal.

It is responsible for:

- running the currently installed stage pack
- offline review and quiz sessions
- local progress storage
- showing daily tasks and weak areas
- syncing results when online

### 2.3 Backend responsibilities

The backend provides the bridge between the web app and device.

It is responsible for:

- lesson and pack metadata APIs
- user progress APIs
- quiz result APIs
- pack availability APIs
- sync endpoints for device uploads/downloads
- stage unlock evaluation

### 2.4 Database responsibilities

The database stores:

- user profiles
- lessons
- stage pack metadata
- kana and vocabulary items
- quiz history
- progress records
- device sync records

---

## 3. Versioning model

The system uses two independent version lines.

### 3.1 Firmware version

Firmware refers to the device program itself.

Examples:

- `firmware 0.1.0`
- `firmware 0.2.0`

Firmware changes when device capabilities change, such as:

- UI improvements
- sync behavior changes
- storage model changes
- power management improvements

### 3.2 Learning pack version

Learning pack refers to stage content.

Examples:

- `pack-pre-n5.v1`
- `pack-n5.v1`
- `pack-n4.v1`

Learning packs change when content changes, such as:

- lesson corrections
- quiz set changes
- vocabulary additions
- completion threshold adjustments

### 3.3 Why they must be separated

Separating firmware from content prevents unnecessary device reflashing.

This enables:

- firmware unchanged, content updated
- content unchanged, firmware fixed
- simpler debugging
- clearer upgrade logic

---

## 4. Stage-pack model

The device should normally load **one stage pack at a time**.

Examples:

- current stage pack = `pack-pre-n5.v1`
- later stage pack = `pack-n5.v1`

This keeps the device experience simple and focused.

### 4.1 Why single-pack mode is preferred

Single-pack mode helps because:

- content stays small enough for offline use
- navigation stays shallow
- the device remains focused on the learner's current stage
- updates are easier to reason about

### 4.2 Pack lifecycle

A pack lifecycle is:

1. stage assigned on web app
2. matching pack installed on device
3. learner studies online and offline
4. completion conditions met
5. next stage unlocked on web app
6. next pack becomes available for device upgrade

---

## 5. Stage state model

Each user has a stage state in the cloud.

Suggested fields:

- `current_stage`
- `stage_status`
- `device_pack_id`
- `device_pack_version`
- `next_stage_unlocked`
- `pack_upgrade_available`

### 5.1 Example states

#### In progress

- `current_stage = pre-n5`
- `stage_status = in_progress`
- `device_pack_id = pack-pre-n5`
- `device_pack_version = v1`
- `next_stage_unlocked = false`
- `pack_upgrade_available = false`

#### Completed and upgrade available

- `current_stage = pre-n5`
- `stage_status = completed`
- `device_pack_id = pack-pre-n5`
- `device_pack_version = v1`
- `next_stage_unlocked = true`
- `pack_upgrade_available = true`

#### Upgraded

- `current_stage = n5`
- `stage_status = in_progress`
- `device_pack_id = pack-n5`
- `device_pack_version = v1`
- `next_stage_unlocked = false`
- `pack_upgrade_available = false`

---

## 6. Device information model

The backend should track minimal device metadata.

Suggested fields:

- `device_id`
- `user_id`
- `firmware_version`
- `current_pack_id`
- `current_pack_version`
- `last_sync_at`
- `last_seen_at`
- `sync_status`

---

## 7. Offline-first behavior

The device must be usable without internet.

### 7.1 Local device storage

The device stores:

- current pack manifest
- lesson items for the current stage
- vocabulary data for the current stage
- quiz data for the current stage
- local progress file
- pending sync queue

### 7.2 Online sync behavior

When internet is available, the device should:

- upload local progress events
- upload quiz results
- fetch pack availability info
- fetch pack version metadata
- optionally download the next stage pack

### 7.3 Offline behavior rules

When no internet is available, the device should still allow:

- lesson browsing for the installed stage
- quiz attempts
- progress updates
- daily task completion

It should not require cloud validation to continue studying within the installed stage.

---

## 8. Suggested sync model

The first version should keep sync simple.

### 8.1 Device upload payloads

The device uploads:

- completed lesson ids
- quiz result summaries
- local timestamps
- streak events
- current pack id/version

### 8.2 Server download payloads

The server returns:

- whether a pack upgrade is available
- target stage
- target pack id/version
- pack metadata
- optional download URL or package checksum

### 8.3 Conflict strategy for v0/v1

For early versions, use a simple merge model:

- keep the highest completion state
- append quiz history
- prefer latest timestamp for last-active values

Avoid complex bi-directional conflict resolution until later.

---

## 9. API direction

### 9.1 Existing base APIs

Already aligned with the product direction:

- `GET /api/kana/{scriptType}`
- `GET /api/dashboard?user_id=...`
- `POST /api/quiz-results`
- `POST /api/progress`

### 9.2 Device-oriented APIs to add later

Recommended later additions:

- `GET /api/device/status`
- `GET /api/device/pack-availability?device_id=...`
- `GET /api/device/pack-manifest?pack_id=...`
- `POST /api/device/upload-progress`
- `POST /api/device/register-sync`

---

## 10. UI role split

### 10.1 Web app UI role

The web app should provide:

- roadmap overview
- lesson explanation pages
- progress dashboard
- account page
- sync center
- stage completion page
- next-stage unlock page

### 10.2 Device UI role

The device should provide only focused actions:

- home
- learn
- review
- quiz
- progress
- sync

No deep content browsing or heavy administration should live on the device.

---

## 11. First release goal

The first coherent dual-system release should be:

- firmware `0.1.0`
- learning pack `pack-pre-n5.v1`
- web app can track stage progress
- backend can save quiz and progress
- device can operate offline within one stage
- web app can determine when the next stage unlocks

---

## 12. Design principle

The web app is the brain.
The device is the blade.

The web app should stay comprehensive.
The device should stay focused, calm, and offline-capable.
