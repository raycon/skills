---
name: daily-note
description: >-
  Log things into a Markdown daily note (Obsidian or similar) and keep its tasks tidy. It adds memos, tasks, highlights, gratitude, scheduled items and purchase lines to the right section in the vault's format, creates the day's note from the template, links lines to their source notes, and marks tasks done, cancelled, on hold or "someday" in the note where they were written. Use this skill whenever the user reports what they did, are doing or plan to do, in any wording, even without mentioning a note ("heading home", "had noodles for lunch", "that's done", "the dentist got cancelled", "meeting next Tuesday at 3"); when something else needs a line in the daily note (a purchase, a contact, a pointer to a note where details were recorded); or when they ask what a day held or which tasks are open. Reviews and reflections are out of scope.
---

# Daily Note

Turn what the user says into short, consistent lines in their daily note.

A daily note is a log the user skims later, and plugins such as Obsidian Tasks and Dataview query it. A line in the wrong section or with a date marker in the wrong place silently drops out of those views. So the format matters more than the wording, and the wording should stay the user's own.

## Learn the vault's conventions first

Vaults differ. Before writing, look for the conventions this vault already uses, and follow them over the defaults below:

- Project instructions (`CLAUDE.md`, `AGENTS.md`, or similar) usually say where daily notes live, how files are named, which sections exist, which task states and emoji are allowed
- The daily note template shows the section headings and the empty placeholders (`- `, `- [ ] `, `====`)
- A few recent daily notes show how the user actually writes

If you can't find a convention, use these defaults:

| Thing | Default |
| --- | --- |
| Daily note | `journal/YYYY/YYYY-MM-DD.md`, created from the daily note template if one exists |
| Sections | Highlight, Tasks, Notes, Gratitude, Review |
| Task states | `[ ]` todo, `[/]` in progress, `[x]` done, `[>]` on hold (still to do, so reminders show it), `[-]` cancelled, `[b]` someday (kept out of reminders) |
| Task dates | Obsidian Tasks emoji at the end of the line: `⏳` scheduled, `✅` done, `❌` cancelled |
| Logged time | 24-hour `HH:MM` in backticks at the start of the line |
| Memo emoji | One per memo, from [`references/memo-emoji.md`](references/memo-emoji.md) |
| Payment method names | The display names from a payment-method note, if the vault has one |

Older notes may follow an older structure. When you write into an existing note, find sections by their emoji or name and keep that note's structure as it is.

## Find the note

1. **Pick the day.** Use today unless the user names another day. Something reported after the fact (a recording, a receipt) belongs to the day it happened.
2. **Get the date from the shell**, in the user's timezone, including the weekday if file names use it. Don't work it out in your head; off-by-one weekdays are a common mistake.

   ```bash
   TZ=Asia/Seoul date '+%Y-%m-%d %a %H:%M'
   ```

3. **Open or create the note.** If it doesn't exist, copy the template and replace its date placeholder (`{{date}}`). Don't create notes for future days in advance.

## Where things go

| What it is | Where | Line |
| --- | --- | --- |
| The one thing that matters most today | Highlight | `==보고서 초안 끝내기==` |
| Something to do, or something done | Tasks | `- [ ] 세탁소 맡기기`, `- [x] 책 반납` |
| Something with a fixed date (appointment, deadline) | Tasks, in today's note | `- [ ] 15:00 치과 ⏳ 2026-11-23` |
| Something for whenever there's time ("시간 날 때", "언젠가", "해 보고 싶다") | Tasks | `- [b] 오래된 사진 정리` |
| Status, activity, food, feelings, thoughts, links | Notes | `` - `12:30` 🍜 점심 칼국수 `` |
| A purchase | Notes | `` - `18:40` 🛒 동네마트, 장보기, 23,500원, 카드 이름 `` |
| A pointer to a note that holds the details (a topic, a person, a receipt) | Notes | `` - `14:59` ℹ️ 전기요금 누진제 정리 [[전기요금]] `` |
| Something they're grateful for | Gratitude | `- 동료가 커피를 사 줌` |
| Keep, Problem, Try | Review | Same line for one item, a `- ` list below the line for several |

- "할 일에 적어" always means the Tasks section, even when it sounds like a memo
- A dated item goes in **today's** note with `⏳ <date>`, not in the note for that date. The vault's reminder query surfaces it on the day. A time of day goes at the start of the text, without backticks
- Notes never use checkboxes. Use plain `- `
- If you can't tell whether it's a task, use Notes for things that happened and Tasks for things still to do
- A pointer is one line: what it's about and a link. The details stay in the linked note

## Purchases

- The line goes in the note of the **payment** day, at the payment time: merchant, what was bought (a short summary such as "장보기" for a long list), amount, payment method
- Use the payment method's display name. If the card isn't listed, write it as given and ask which card it is
- A card message or a spoken purchase has only what it says. Don't add items it doesn't name
- Before writing, look for the same purchase: the same approval number, or the same time, merchant and amount. If it's already there, skip it and say so
- A cancellation goes as a sub-item under the original purchase line, not as a new purchase
- If the vault keeps a purchase-log note that is still in use, link it the way existing lines do

## Update existing tasks in place

A task lives in the note where it was first written. Change that line instead of adding a new one, so nothing is listed twice.

- **Done**: `[ ]` → `[x]` and add `✅ <date it was finished>` at the end
- **Cancelled**: → `[-]` and add `❌ <date it was cancelled>`
- **On hold** ("미뤄 둘게", "보류"): → `[>]`
- **Someday task they decide to do**: `[b]` → `[ ]`
- **Progress or result** ("물어봤어", "주문했어"): add a tab-indented sub-item under the task. Don't also write it as a memo. If it finished the task, mark the task done too
- **A done task that leads to an appointment** (bought tickets, now visiting on Saturday): mark the task `[x]` and add the appointment as a separate `⏳` task. Don't repeat it in Notes

Don't copy unfinished tasks into today's note. The reminder query already shows them, and copies drift apart.

To find the task, search the journal for open lines that match. If several match or none do, ask which one instead of guessing.

## Line format

- **Date markers go last.** Nothing comes after `⏳`, `✅` or `❌`. If a line has two, `⏳` comes first: `- [x] 치과 ⏳ 2026-11-23 ✅ 2026-11-23`
- **Logged time** starts every memo: `` - `08:50` 🏢 출근 ``. Use the clock time given for when it happened; for something from a source, the source's time (when it was recorded, when it was paid); otherwise the current time. Don't turn words like "점심", "아침" into a guessed time. A time that's part of the content (an appointment time) is plain text. Don't change the time format on lines the user wrote by hand
- **Source links**: when an item comes from a source note (a recording transcript, a receipt), link the time to it. Use angle brackets because file names often contain spaces: ``- [`10:21`](<음성 20261113.md#음성 261113_102154>) 🥕 중고 자전거 판매``. Task lines put the link after the checkbox: ``- [ ] [`19:30`](<음성 20261118.md#음성 261118_193012>) 19:00 친구와 저녁 ⏳ 2026-11-26``
- **Same source again**: a source may be processed again after it's corrected. If a line already links the same source for the same item, update that line instead of adding another
- **Memo emoji**: pick exactly one per memo from the vault's list, or from [`references/memo-emoji.md`](references/memo-emoji.md) when the vault has none; read the list before choosing. Pick by what the thing is, not by a word in it. If nothing fits, use the list's fallback emoji. Never invent one that isn't in the list. Tasks and sub-items carry no emoji
- **Follow-ups**: a later memo on the same topic the same day goes under the first one as a tab-indented sub-item, without an emoji
- **Links**: add `[[note name]]` when a related note exists. Check that it exists; don't make up names
- **Placeholders**: when you fill a section, remove its empty placeholder (`- `, `- [ ] `, `====`). Leave untouched sections exactly as the template has them
- **Wording**: keep what the user said. Fix typos and trim filler, but don't summarize away details or add facts they didn't give

## Reading

Some requests only read the notes: "오늘 뭐 했지", "시간 날 때 할 일 보여 줘", "보류한 거 뭐 있어". Search the journal, list the matching lines ordered by note date, and don't edit anything. Link the notes you used.

## Reply

Say in a line or two which note and section changed and what went in. If you added a dated item, mention the date so the user can put it on their calendar too.

Example, after "점심 칼국수 먹었고, 다음 주 화요일 3시에 치과 예약했어" sent at 13:05:

```
## 🚧 작업

- [ ] 15:00 치과 ⏳ 2026-11-24

## 📃 메모

- `13:05` 🍜 점심 칼국수
```

> 11-17 일일노트에 적었어요. 작업: 치과(11-24 15:00), 메모: 점심 칼국수. 치과는 달력에도 넣어 두세요.
