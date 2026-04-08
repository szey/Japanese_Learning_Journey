# pack-pre-n5.v1 Content Spec

## 1. Purpose

`pack-pre-n5.v1` is the first offline learning pack for the e-ink device.

Its purpose is to provide a complete beginner learning experience before formal JLPT N5 study begins.

This pack is designed to help the learner:

- read Hiragana and Katakana
- recognize core beginner sounds
- read very small words
- learn a minimal survival vocabulary layer
- complete small quizzes without internet access

---

## 2. Stage scope

### Included

- Hiragana fundamentals
- Katakana fundamentals
- starter reading drills
- greetings and basic social expressions
- numbers 1 to 20
- essential beginner words
- beginner quiz loops

### Excluded

- full N5 grammar curriculum
- long reading passages
- kanji learning system
- advanced listening
- complex sentence production

This pack must stay small, focused, and highly repeatable.

---

## 3. Pack metadata

Suggested manifest values:

- `pack_id = pack-pre-n5`
- `pack_version = v1`
- `stage = pre-n5`
- `title = Pre-N5 Foundation Pack`
- `firmware_min_version = 0.1.0`
- `estimated_total_sessions = 20`
- `completion_mode = threshold_based`

---

## 4. Module overview

The pack contains five modules.

### Module A — Hiragana Foundation

Goal:

- learn 46 basic Hiragana
- associate kana with romanization
- recognize row grouping

Suggested lesson groups:

1. `hira-a-row`
2. `hira-ka-row`
3. `hira-sa-row`
4. `hira-ta-row`
5. `hira-na-row`
6. `hira-ha-row`
7. `hira-ma-row`
8. `hira-ya-row`
9. `hira-ra-row`
10. `hira-wa-row`
11. `hira-n`
12. `hira-review-1`

Suggested minimum data per item:

- kana
- romanization
- script type
- group
- sample word
- optional stroke data reference

### Module B — Katakana Foundation

Goal:

- learn 46 basic Katakana
- recognize common foreign-sound forms
- identify simple loanword patterns

Suggested lesson groups:

1. `kata-a-row`
2. `kata-ka-row`
3. `kata-sa-row`
4. `kata-ta-row`
5. `kata-na-row`
6. `kata-ha-row`
7. `kata-ma-row`
8. `kata-ya-row`
9. `kata-ra-row`
10. `kata-wa-row`
11. `kata-n`
12. `kata-review-1`

### Module C — Starter Reading

Goal:

- move from single kana recognition into very small reading units
- train confidence in joining symbols into words

Lesson types:

- read simple Hiragana words
- read simple Katakana words
- mixed recognition

Suggested starter words:

- あさ
- いえ
- うみ
- えき
- ねこ
- みず
- ほん
- テスト
- コーヒー
- ホテル
- バス
- ラジオ

### Module D — Survival Mini Vocabulary

Goal:

- build immediate usefulness and emotional reward
- provide a tiny word layer before grammar-heavy study begins

Subgroups:

#### Greetings

- おはよう
- こんにちは
- こんばんは
- ありがとう
- さようなら

#### Identity / people

- わたし
- あなた
- ひと
- ともだち

#### Daily objects / basics

- みず
- ほん
- いえ
- ねこ
- いぬ
- くるま

#### Numbers 1–20

- いち
- に
- さん
- し / よん
- ご
- ろく
- なな / しち
- はち
- きゅう / く
- じゅう
- じゅういち ... にじゅう

### Module E — Pre-N5 Quiz Pack

Goal:

- reinforce recognition through small loops
- provide completion evidence for stage unlock

Quiz types:

1. kana → romanization
2. romanization → kana
3. word reading match
4. greeting meaning match
5. number reading match
6. mixed review quiz

---

## 5. Lesson structure

Each lesson should have:

- `lesson_id`
- `title`
- `module`
- `order`
- `type`
- `estimated_minutes`
- `unlock_rule`
- `content_refs`

Suggested lesson types:

- `kana_row`
- `reading_drill`
- `vocab_set`
- `quiz`
- `review`

Suggested duration per lesson:

- 3–8 minutes on device

The device should feel fast and repeatable, not heavy.

---

## 6. Content file design

Recommended file layout inside the pack:

```text
pack-pre-n5/
  manifest.json
  lessons.json
  kana.json
  vocab.json
  quizzes.json
  rules.json
```

### 6.1 `manifest.json`

Stores:

- pack id
- version
- stage
- display title
- firmware min version
- build date
- checksum info if needed

### 6.2 `lessons.json`

Stores:

- lesson ids
- titles
- order
- module grouping
- unlock requirements
- content references

### 6.3 `kana.json`

Stores:

- kana
- romanization
- script type
- row group
- sample word
- optional stroke reference

### 6.4 `vocab.json`

Stores:

- word
- reading
- meaning
- category
- stage tag

### 6.5 `quizzes.json`

Stores:

- question id
- quiz type
- prompt
- answer
- distractors
- explanation optional

### 6.6 `rules.json`

Stores:

- completion thresholds
- lesson unlock rules
- stage completion rules

---

## 7. Suggested progression order

The device should present content in this order:

1. Hiragana rows
2. Hiragana review
3. Katakana rows
4. Katakana review
5. starter reading drills
6. greetings and tiny vocab
7. numbers 1–20
8. mixed review quizzes

This order gives the learner early wins and avoids jumping too fast into abstract material.

---

## 8. Stage completion rules

Suggested stage completion rules for `pack-pre-n5.v1`:

### Required thresholds

- Hiragana mastery >= 90%
- Katakana mastery >= 85%
- survival vocab mastery >= 80%
- total quiz passes >= 3
- at least one mixed quiz score >= 80%

### Optional support thresholds

- total active days >= 5
- all core lesson groups opened at least once

These thresholds should be stored in `rules.json` and mirrored in the web app stage logic.

---

## 9. Suggested mastery model

For v1, keep mastery simple.

### Per-item mastery states

- `new`
- `learning`
- `review`
- `mastered`

### Promotion suggestion

An item becomes:

- `learning` after first correct interaction
- `review` after repeated correct recognition
- `mastered` after passing a threshold such as 3 correct results without recent failure

Do not build a full spaced-repetition engine yet.

---

## 10. Local device progress data

The device should locally store at least:

- completed lesson ids
- item mastery states
- latest quiz results
- total sessions
- local streak count
- pending sync queue

Suggested local files:

- `progress.json`
- `quiz_history.json`
- `sync_queue.json`

---

## 11. Sync events produced by this pack

This pack should be able to emit these events:

- lesson completed
- lesson opened
- quiz finished
- item promoted to mastered
- daily session completed

The first backend version can aggregate these into:

- progress updates
- quiz result records
- stage completion checks

---

## 12. Device UI mapping for this pack

### Home

Shows:

- current pack title
- today task count
- streak
- sync status

### Learn

Shows:

- Hiragana
- Katakana
- Starter Reading
- Survival Mini Vocabulary

### Review

Shows:

- weak items
- pending review cards
- recent mistakes

### Quiz

Shows:

- Kana Quiz
- Word Quiz
- Mixed Quiz

### Progress

Shows:

- Hiragana completion %
- Katakana completion %
- vocab completion %
- best mixed quiz score

### Sync

Shows:

- pack id/version
- firmware version
- last sync time
- next pack availability

---

## 13. Success criteria for v0 device experience

The pack is successful if a complete beginner can:

- turn on the device
- understand what to study next
- complete a 5-minute offline session
- see progress increase clearly
- finish the full Pre-N5 pack without internet dependency during study sessions

---

## 14. Future upgrade path

After this pack is completed:

- web app unlocks `n5`
- device may receive `pack-n5.v1`
- Pre-N5 remains in cloud history
- device focus shifts fully to the next stage

This keeps the device simple and prevents content overload.
