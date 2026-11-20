---
name: journal-review
description: >-
  Run a daily or weekly review on Markdown daily notes (Obsidian or similar). It asks the user about one topic at a time, offers answer options taken from their own notes, and writes the answers back into the notes. Use this skill whenever the user asks to review or reflect on a day or a week, in any wording: "회고", "어제 회고", "오늘 돌아보기", "하루 정리", "주간 회고", "이번 주 정리", "KPT", "daily review", "weekly review", "retro". Also use it when the user wants to sort through unfinished tasks spread across journal notes, even if they don't say "review".
---

# Journal Review

Help the user reflect on a day or a week using what their journal already says. Then record their answers where they belong.

Most people don't skip reviews because they have nothing to say. They skip them because a blank "What went well?" takes effort to answer. This skill makes the review quick: first show what happened, then ask one short question per topic with options taken from the notes. The user can pick an option, adjust it, or type their own answer.

## Learn the vault's conventions first

Vaults differ. Before reading any notes, look for the conventions this vault already uses, and follow them over the defaults below:

- Project instructions (`CLAUDE.md`, `AGENTS.md`, or similar) usually say where daily notes live, how files are named, and which sections they have
- The daily note template shows the section headings and the empty placeholders (`- `, `- [ ] `, `Keep: `) that get filled in
- A few recent daily notes show how the user actually writes

If you can't find a convention, use these defaults:

| Thing | Default |
| --- | --- |
| Daily note | `journal/YYYY/YYYY-MM-DD.md`, created from the daily note template if one exists |
| Sections | Highlight, Tasks, Notes, Gratitude, Review |
| Review block | `Keep:`, `Problem:`, `Try:` lines |
| Task states | `[ ]` todo, `[/]` in progress, `[x]` done, `[-]` cancelled, `[>]` on hold |
| Task dates | Obsidian Tasks emoji at the end of the line: `⏳` scheduled, `✅` done, `❌` cancelled, in that order |

Older notes may follow an older structure. When you write into an existing note, keep that note's structure as it is.

## How to ask

Each topic gets its own question. A topic the user can skip always has a "없음" (none) option, so skipping doesn't feel like failing.

- **Options come from the record.** Use the user's own notes, especially lines where they already judged something ("좋았다", "다음엔 이렇게 해야지"). In the description, say where each option comes from. Options are candidates for the user to choose from. Never put a judgment in an option that the notes don't support.
- **With a question tool** (such as `AskUserQuestion`): ask up to 4 questions per call, each with 2 to 4 options. The tool adds a free-text "Other" choice by itself, so don't add one. If there are more than 4 topics, make another call.
- **Without one** (chat bots, messaging apps): send all the questions in one message as numbered lists, and let the user answer briefly, for example "1-2, 2-1, 3: 직접 쓴 답".

## Daily review

1. **Pick the day.** "어제 회고" means yesterday, "회고" or "오늘 회고" means today. If a date is named, use that date.
2. **Gather the record.** Read that day's tasks and notes. Also search the other journal notes for tasks finished that day (`✅ <that date>`). People often finish older tasks without writing anything new. Then open the previous daily note and check whether it has a Try.
3. **Show a short summary.** In a few lines, show what happened, what got done, and what is still open. This is a reminder for the user, not an assessment.
4. **Ask, in this order:**
   - The previous day's Try, only if it had one: did they try it, and how did it go?
   - The day's highlight, only if it's empty
   - Keep: what went well, what to keep doing
   - Problem: what got in the way. Ask about the obstacle, not about tasks left undone. "Meetings ate my focus time" helps more than "didn't finish the report"
   - Try: one concrete action to test next time, one that solves a Problem or strengthens a Keep. To-do items go in the tasks section, not here
   - Gratitude
   - The next day's highlight: take options from tasks scheduled for that day or still open
5. **Write the answers, then say what you wrote and where.**
   - Keep the user's wording. Trim it lightly to match the note's style, and add nothing they didn't say
   - The result of the previous Try goes into this day's Keep or Problem. Don't edit the previous note
   - One item goes on the same line (`Keep: ...`). Several items go below the line as a `- ` list
   - The next day's highlight goes into the next day's note. If that note doesn't exist, create it from the template
   - When you fill a section, remove its empty placeholder. Leave sections the user skipped exactly as the template has them

Example summary and review block:

```
11-18 (수)
- 한 일: 치과 정기 검진, 책 반납
- 메모: 퇴근 후 30분 걷기, "생각보다 개운했다"
- 남은 작업: 세탁소 맡기기
```

```
Keep: 귀찮아도 퇴근 후 일단 나가서 걸음
Problem: 늦게 먹은 야식 때문에 잠이 늦어짐
Try: 저녁을 든든히 먹고 9시 이후엔 먹지 않기
```

## Weekly review

The goal is to leave the week with a clean task list and no useful information buried in daily notes.

1. **Open tasks.** Collect `[ ]` and `[/]` tasks from the journal, ordered by note date. For each one, ask whether to keep it (leave it as is), mark it done (`[x]` + `✅ <date>`), or drop it (`[-]` + `❌ <date>`). Use today's date unless the user gives another. Edit the task in its original note. Don't copy it into a new note. Leave tasks the user doesn't answer as they are.
2. **On hold and someday tasks.** Show `[>]` tasks and any "someday" tasks the vault uses, and ask which ones to take on this week. Change those to `[ ]` in place.
3. **Knowledge left in daily notes.** Knowledge should reach topic notes when it's recorded; this step catches what didn't. Look through the week's notes for things the user will want to find again: a recipe, a product they compared, a size that fit, advice someone gave, a conclusion they reached. Suggest where each one should go, preferring existing notes over new ones. Leave notes that only matter in the context of that day. Move only what the user approves, following the topic-notes skill if available, and leave a one-line pointer with a link in the original note (for example `ℹ️ 갈비탕 레시피 정리 [[갈비탕]]`).

When there are many tasks, ask in batches of 4 so each answer stays a single tap.

## Principles

- The user decides what was good or bad. The notes only provide the options. Don't grade the day or fill gaps with guesses
- Small, quick questions beat a complete questionnaire. If the user answers briefly, write briefly
- Edits go in place, in the note where the item lives. A review should never create duplicate tasks
