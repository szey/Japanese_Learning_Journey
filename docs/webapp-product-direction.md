# Web App Product Direction

## 1. Direction reset

Japanese Learning Journey is now treated as a **web-first product**.

The active product question is no longer:

- how to build a learning hardware terminal

The active product question is now:

- how to make Japanese beginner learning feel clear, structured, and easy to continue inside a web app

---

## 2. Why this reset happened

The hardware + language-learning positioning space became too noisy and too easy to confuse with existing vocabulary-device products.

That made the value story harder to explain.

The project now focuses on the stronger core:

- beginner progression design
- stage-pack structure
- clean product flow
- real web app experience
- Go backend + content pack integration

---

## 3. New core product definition

Mirai Nihongo is a web app for Japanese beginners that helps them move from:

- not knowing where to start
- struggling with kana and first reading confidence
- lacking a clear study path

into:

- finishing a clean Pre-N5 foundation
- entering N5 with structure
- seeing progress clearly
- continuing through stage-based content

---

## 4. Product focus

The main product is now:

**a web app for Japanese beginner progression**

Not a gadget.
Not a vocabulary hardware device.
Not a broad multi-language study machine.

---

## 5. What makes this product different now

The difference should come from product structure, not hardware.

### 5.1 Stage-first learning

The learner is guided through a sequence of stage packs.

Examples:

- Pre-N5
- N5
- N4

### 5.2 Beginner-first design

The product should solve the specific beginner problem:

- kana anxiety
- first-word reading difficulty
- no obvious next step

### 5.3 Calm progression

The product should feel structured and constrained enough that the learner can keep moving without constant decision fatigue.

### 5.4 Shared pack model

Content should still be authored through packs so the product has a clean internal learning architecture.

---

## 6. Current active stack

### Frontend

- Next.js

### Backend

- Go

### Database

- Supabase Postgres

### Content model

- stage packs stored in repository data files

---

## 7. Current active repository areas

These are the active product layers now:

- `webapp/`
- `backend/`
- `packs/`
- `docs/`

These layers should be treated as the real product path.

---

## 8. Near-term product priorities

### Priority 1

Make the web app consume real pack data through backend APIs.

### Priority 2

Turn `pack-pre-n5-v1` into a real interactive beginner experience.

### Priority 3

Make dashboard, kana, quiz, and progress views data-driven.

### Priority 4

Refine product positioning around beginner progression instead of device novelty.

---

## 9. Product language to use

Recommended language:

- Japanese beginner learning app
- Pre-N5 foundation app
- stage-based Japanese learning flow
- structured beginner progression

Language to avoid for now:

- word machine
- offline hardware terminal
- e-ink device product
- gadget-first description

---

## 10. Hardware status

Hardware exploration is not deleted as an idea, but it is no longer the main product direction.

For now, hardware is:

- archived exploration
- not the main build path
- not the core positioning layer

---

## 11. Practical rule for future decisions

If a decision does not clearly improve the web-first beginner learning experience, it should not lead the roadmap.

That rule should simplify future choices.
