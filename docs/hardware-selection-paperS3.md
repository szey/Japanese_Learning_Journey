# Hardware Selection: M5Stack PaperS3

## 1. Decision

The first hardware target for the offline device is:

**M5Stack PaperS3**

This device is the primary hardware platform for the first focused e-ink learning terminal in Japanese Learning Journey.

---

## 2. Why this hardware was selected

The project needs a device that can support:

- offline learning sessions
- low-distraction reading and quiz interaction
- touch-based navigation
- battery-powered portable usage
- low-power idle and resume behavior
- local pack storage
- later cloud sync integration

PaperS3 fits this direction well because it combines:

- ESP32-S3 class microcontroller
- 4.7 inch e-ink display
- touch support
- battery support
- microSD support
- low-power design direction
- official documentation and examples

This makes it more suitable than using a separate e-paper panel plus an external controller for the first product-oriented prototype.

---

## 3. Project role of the device

PaperS3 is **not** the master application host.

It is the:

**focused offline terminal**

The web app remains the master console.
The backend remains the system bridge.
The device runs one stage pack at a time.

---

## 4. PaperS3 responsibilities in this project

The PaperS3 device is responsible for:

- loading the currently installed stage pack
- showing current stage lessons
- running offline review flows
- running offline quizzes
- storing local progress
- syncing progress when internet is available
- showing pack version and sync state

The device is not responsible for:

- full roadmap browsing from Pre-N5 to N1
- heavy account settings management
- long-form lesson editing or content management
- cloud analytics dashboards
- complex admin workflows

---

## 5. Why this is better than a raw panel

A raw e-paper panel plus optional driver board would require the project to solve more low-level problems at once, including:

- controller choice
- interface compatibility
- physical integration
- power design
- storage integration
- input method integration

That would increase hardware complexity too early.

PaperS3 reduces those unknowns and lets the project focus first on:

- product flow
- UI model
- pack architecture
- offline experience
- sync logic

---

## 6. Why this is better than directly using a normal web device

The project specifically wants a low-distraction, portable, offline-capable terminal.

A phone or tablet can already run the web app, but it does not provide the same product experience as:

- e-ink reading comfort
- low-interruption learning
- constrained single-purpose interaction
- stage-focused usage

PaperS3 supports the product identity better.

---

## 7. Device assumptions for v0

For the first device release, the project assumes:

- one current stage pack installed
- pack stored locally
- progress stored locally
- no dependence on constant internet access
- touch-driven menu navigation
- simple page layout for e-ink refresh behavior

The first device release does **not** assume:

- full online browsing
- multi-stage pack coexistence
- real-time cloud dependency during study sessions
- complex animation-heavy interaction

---

## 8. Device constraints that affect design

Even though PaperS3 is a good fit, it is still an embedded device.

The design must respect:

- limited compute compared with laptop/mobile browsers
- e-ink refresh characteristics
- the need for clean, static UI layouts
- careful use of redraws
- smaller memory budget than full desktop/mobile environments
- simpler offline-first data structures

This means the device UI should remain:

- calm
- simple
- structured
- highly readable
- low refresh frequency

---

## 9. UI principles for PaperS3

The device UI should prioritize:

- large tap targets
- strong contrast
- low visual clutter
- page-based interaction over dense nested menus
- short session loops
- clear progress visibility

The UI should avoid:

- tiny controls
- overly dynamic transitions
- multi-column density that harms readability
- dependence on fast repeated redraws

---

## 10. Storage model direction

PaperS3 should use a local-first content model.

Recommended local data categories:

- stage pack manifest
- lesson list
- kana data
- vocabulary data
- quiz data
- local progress
- pending sync queue

This can later be implemented using:

- onboard storage for small state
- microSD for pack files if needed

---

## 11. Synchronization role

PaperS3 should sync with the backend only when useful.

Main sync actions:

- upload completed lesson states
- upload quiz result summaries
- fetch pack availability info
- fetch next pack metadata
- optionally download pack updates

The device should never require sync in order to continue studying inside the currently installed pack.

---

## 12. Why PaperS3 is a good first hardware target

PaperS3 is the right first hardware target because it balances:

- enough capability to build a meaningful prototype
- lower integration pain than raw panel solutions
- better product identity than generic mobile/web-only use
- enough portability for real daily carry
- enough display area for stage-based learning pages

For the first phase of the project, that balance matters more than maximizing hardware freedom.

---

## 13. First hardware release scope

The first device release should be defined as:

- hardware: M5Stack PaperS3
- firmware: `0.1.0`
- pack: `pack-pre-n5.v1`

The device should support these pages:

- Home
- Learn
- Review
- Quiz
- Progress
- Sync

This is enough to create a real, testable offline learning terminal without overloading the first version.

---

## 14. Future hardware note

This decision does not permanently lock the project to one hardware family.

Later versions may support:

- another e-ink board
- a smaller companion device
- a larger reading-focused device

But v0 and the first serious prototype should be built against one stable target.

That target is PaperS3.
