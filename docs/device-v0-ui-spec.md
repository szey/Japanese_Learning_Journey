# Device v0 UI Spec

## 1. Scope

This document defines the first device UI for:

- hardware: **M5Stack PaperS3**
- firmware: **0.1.0**
- learning pack: **pack-pre-n5.v1**

The device UI is designed for offline-first daily study sessions.
It should be simple, readable, and highly focused.

---

## 2. Device role

The device is not the full app.
It is a focused offline terminal for the current stage.

For v0, the current stage is:

- `pre-n5`

The UI should help a beginner quickly understand:

- what to study today
- where to continue
- what to review
- how much progress has been made
- whether sync or upgrade is available

---

## 3. Global UI principles

The v0 UI should follow these principles:

- large tap targets
- very low visual clutter
- strong hierarchy
- short navigation depth
- text-first layouts
- e-ink-friendly static screens
- minimal partial refresh complexity

The device should feel like:

- calm
- deliberate
- focused
- lightweight

---

## 4. Information architecture

The device has six top-level pages:

1. Home
2. Learn
3. Review
4. Quiz
5. Progress
6. Sync

These are the only top-level destinations in v0.

---

## 5. Navigation model

### 5.1 Main navigation

The device should use a simple bottom or side navigation model with the six top-level pages.

Recommended visible labels:

- Home
- Learn
- Review
- Quiz
- Progress
- Sync

### 5.2 Page depth rule

For v0, do not go beyond:

- top-level page
- one sub-page or list item page
- one session view

This keeps the device easy to use and easy to render.

---

## 6. Home page

### 6.1 Purpose

The Home page is the quick daily launch page.

It answers:

- what stage am I in
- what should I do today
- how much have I done
- when did I last sync

### 6.2 Required content

Home should show:

- current stage: `Pre-N5`
- current pack: `pack-pre-n5.v1`
- current streak
- number of today tasks
- quick progress summary
- last sync time
- whether next stage is locked or unlocked

### 6.3 Suggested sections

- Header
  - stage title
  - date or current time optional
- Today task card
- Continue learning button
- Quick progress summary
- Sync status line

### 6.4 Primary actions

- Continue today
- Open Learn
- Open Review
- Open Sync

### 6.5 Example layout

- top: stage title + streak
- middle: today tasks card
- bottom: progress summary + sync note

---

## 7. Learn page

### 7.1 Purpose

The Learn page is the structured module entry point for the current pack.

### 7.2 Required modules for v0

The Learn page should show four module cards:

- Hiragana
- Katakana
- Starter Reading
- Survival Mini Vocabulary

### 7.3 Card content

Each module card should show:

- module title
- short description
- completion percent
- next lesson label

### 7.4 Module entry flow

When the user taps a module:

- open lesson list or next lesson directly

### 7.5 Lesson row content

A lesson row should show:

- lesson title
- lesson type
- completion state
- estimated minutes

### 7.6 Completion states

Use simple states:

- not started
- in progress
- completed

---

## 8. Review page

### 8.1 Purpose

The Review page brings weak items forward.

This is the page for:

- weak kana
- weak words
- recently missed quiz items
- quick daily review loops

### 8.2 Required sections

Review should show:

- weak kana
- weak vocab
- recent mistakes
- quick review session entry

### 8.3 Item card content

Each review item should show:

- symbol or word
- small hint or reading
- mastery state

### 8.4 Primary actions

- start review
- mark known
- retry

### 8.5 Review scope for v0

Do not implement a heavy spaced repetition engine yet.

For v0, review can simply surface:

- items with repeated mistakes
- items not seen recently
- items not yet mastered

---

## 9. Quiz page

### 9.1 Purpose

The Quiz page is for short, repeatable testing loops.

### 9.2 Required quiz types in v0

The page should show three quiz options:

- Kana Quiz
- Word Quiz
- Mixed Quiz

### 9.3 Quiz session design

Each quiz session should be short.

Recommended:

- 5 questions
- 10 questions maximum for v0

### 9.4 Question types

For v0, supported question patterns can be:

- kana -> romanization
- romanization -> kana
- word -> meaning
- greeting -> meaning
- number reading match

### 9.5 Result screen

After each quiz session show:

- score
- total questions
- weak area note
- save locally confirmation
- optional sync pending indicator

### 9.6 Primary actions

- retry same quiz
- return to Quiz menu
- go to Review

---

## 10. Progress page

### 10.1 Purpose

The Progress page shows stage advancement clearly.

### 10.2 Required metrics

Progress should show:

- Hiragana completion %
- Katakana completion %
- Starter Reading completion %
- Vocabulary completion %
- total quizzes completed
- best mixed quiz score
- stage completion status

### 10.3 Visual style

Use simple bars or segmented progress blocks.
Avoid heavy graphs.

### 10.4 Unlock note

If stage completion thresholds are close, show:

- remaining requirements

If thresholds are met, show:

- next stage unlock available on web app

---

## 11. Sync page

### 11.1 Purpose

The Sync page handles all device-cloud communication status.

### 11.2 Required fields

Sync should show:

- firmware version
- current pack id
- current pack version
- last sync time
- sync status
- pack update availability

### 11.3 Primary actions

- Sync now
- Check pack update
- View current pack info

### 11.4 States

Sync state examples:

- offline
- ready to sync
- syncing
- sync success
- sync failed
- next pack available

### 11.5 Update behavior note

The page should not force the learner to update during a study session.
Updates should feel deliberate, not disruptive.

---

## 12. Common session UI rules

### 12.1 Header rules

Each page should include:

- page title
- optional small stage label
- optional battery or sync icon if available later

### 12.2 Buttons

Buttons should be:

- large
- simple
- single-purpose
- easy to hit on e-ink touch

### 12.3 Typography

Typography should prioritize:

- large main labels
- medium progress labels
- minimal tiny text

### 12.4 Motion

Avoid relying on motion-heavy transitions.
Page changes should be mostly static.

---

## 13. Suggested page-to-page flow

### Daily-first flow

- Home -> Continue today -> next lesson or review

### Study flow

- Learn -> Module -> Lesson -> Progress update -> Home or Review

### Review flow

- Review -> quick review session -> Progress or Quiz

### Quiz flow

- Quiz -> quiz type -> result -> Review or Home

### Sync flow

- Sync -> check status -> upload/download -> return Home

---

## 14. State display language

Device copy should be short and direct.

Examples:

- `Today: 3 tasks`
- `Next lesson: a-row`
- `Weak area: Katakana`
- `Sync needed`
- `Pack update available`
- `Pre-N5 complete`

Do not overload the device with long explanatory text.
That belongs on the web app.

---

## 15. v0 success criteria

The v0 UI is successful if a complete beginner can do this without guidance:

1. turn on the device
2. understand what to do next
3. enter a module
4. finish a short lesson or quiz
5. see progress update clearly
6. sync later when online

If any of those steps feels confusing, the UI is too complicated.

---

## 16. Out of scope for v0

The following should not be added to v0 device UI:

- full roadmap from Pre-N5 to N1
- full settings system
- complex theme switching
- heavy animation
- advanced statistics dashboards
- deep admin or account management
- long-form lesson essays

v0 should stay tightly focused on one job:

**make Pre-N5 offline learning feel easy, calm, and repeatable**.
