# Japanese Learning Journey / Mirai Nihongo

A multi-page static frontend for learning Japanese from true beginner foundation to JLPT N1.

## Pages

- `index.html` — homepage and roadmap
- `kana.html` — Kana Lab with audio and stroke demo
- `levels.html` — level hub from Pre-N5 to N1
- `dashboard.html` — browser-saved progress tracker
- `quiz.html` — kana quiz with score saving
- `styles.css` — shared styling
- `script.js` — theme toggle, audio, stroke demo, progress, quiz

## Current scope

This is a static frontend prototype with real interactions:

- foundation-first onboarding before N5
- dedicated Hiragana and Katakana page
- browser speech synthesis audio
- prototype SVG stroke-order animation
- browser localStorage progress saving
- kana quiz flow

## Deploy with GitHub Pages

1. Push these files to the root of the repository.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**.
4. Select **main** and **/(root)**.
5. Save.

GitHub Pages will publish the site using `index.html`.

## Natural next steps

- add real lesson content for Pre-N5 and N5
- expand full kana stroke coverage
- add kanji and grammar modules
- add spaced review logic
- add backend support if account sync is needed
