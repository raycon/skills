---
name: topic-notes
description: >-
  Keep knowledge in topic notes in a Markdown vault (Obsidian or similar), apart from the daily log. It records information (prices, sizes, conditions, how-tos) and the user's own judgments (conclusions, preferences, decisions, lessons) in the note for that subject, creates notes named by subject, dates each entry, keeps old values when they change, and checks the vault for broken links and stray or overlapping notes. Use this skill whenever something worth finding again comes up, in any wording or from any source: a price comparison, a size that fit, a how-to, advice, a decision and its reason, a link to keep ("이거 저장해 줘", "요금제 비교해 봤는데", "다음엔 생수 챙겨야겠다"); when another skill (daily note, voice memo, review) has knowledge to file; when the user asks what their notes say ("유산균 어디가 제일 쌌지?"); or when they ask to check or tidy the vault ("Vault 점검해 줘").
---

# Topic Notes

A vault holds two kinds of things. **Events** are what happened, how it felt, and what's still to do; they go in the daily log. **Knowledge** is what the user will want to find again; it goes in a topic note, one per subject, so it stays together and current. This skill handles the knowledge.

Knowledge left in a daily note is effectively lost: nobody rereads old days to find a price. So file it when it arrives, not later.

## Learn the vault's conventions first

Read the vault's project instructions (`CLAUDE.md`, `AGENTS.md`, or similar) and a few existing topic notes. Follow them over these defaults:

| Thing | Default |
| --- | --- |
| Topic notes | Notes outside the journal and the raw archive, in the vault's folders (PARA or similar) |
| Frontmatter | `created: "YYYY-MM-DD"` and `tags`, in the vault's existing format |
| Entry date | `` `YYYY-MM-DD` `` at the start of the line: the day it was learned |
| Web sources | A `## 참고` section at the end of the note, with the URLs |
| Pointer | One memo in that day's daily note, linking the topic note |

## Information and judgment

Knowledge comes in two kinds, and they are handled differently:

- **Information** is what anyone could check: a price, a size chart, a condition, a how-to. Summarize and rewrite it freely. Record it when it would be hard to find again or it fed a decision; skip what a quick search would find anyway
- **Judgment** is the user's own: a conclusion, a preference, a decision and its reason, a lesson ("L이 딱 맞음", "다음엔 생수 챙기기"). Record it even when it's a single line, in the user's words. Nobody else can supply it, and rewording it changes what they concluded
- Record a judgment only when the user stated one. A feeling without a conclusion ("개운했다") is an event and stays in the daily note

The most useful entries pair the two: a size chart and the size that actually fit, three prices and the one they picked. Keep such pairs next to each other.

## Find or create the note

1. **Search first**: file names, aliases, headings, then content. Adding to a broader existing note beats creating a narrow new one; a vault of one-fact notes is as hard to use as no notes.
2. **Create only when nothing fits.** Name the note by the subject the user would search for: `유산균`, not `락토핏 가격 비교 11월`. Place it by the vault's classification (in PARA: a Project if it has a deadline or end, an Area if it's ongoing, a Resource for reference). If unsure, put it in the inbox and say so.
3. **People are not topics.** What the user learns about a person goes to that person's note (a people-notes skill if available).

## Write the entry

- Date it with the day it was learned. For a recording or a receipt, that's the day it happened, not today
- Put it under the heading it belongs to. Add headings once a note grows into parts
- When a value or a judgment changes, add a new dated line and keep the old one. Both were true at their time, and old prices are often what the user is comparing against
- Name the source when it isn't the user: URLs go in `## 참고`; something heard names who said it (`매장 직원`, `[[김민수]]`)
- Leave a pointer in the daily note of that day: one memo that names the subject and links the note, for example ``- `14:59` ℹ️ 러닝화 착화감 기록 [[발사이즈]]``. The details live only in the topic note. Load the daily-note skill, if available, before writing it; it has the line format and the memo emoji

## Tidy a note

A topic note is the agent's to keep in order. Reorder entries, group them under headings, merge duplicates, add a short summary at the top. Rewrite information freely; move judgments without changing their words. Keep every entry: tidying changes the shape, not the record.

Changes that span notes (merging two notes, moving or renaming one) touch links elsewhere. Show the plan and get the user's go-ahead first.

## Answer from the notes

For a question, search the topic notes first and link the notes the answer came from. If you look something up elsewhere to answer it, record what you found in the fitting topic note and say where it went.

## Check the vault

When asked to check the vault, look for these and report them as a list:

- Broken links: `[[...]]` targets that don't exist
- Notes without frontmatter, or without the `created` date that queries rely on
- Empty notes, and notes left in the inbox for more than two weeks
- Projects with no edits and no open tasks linking them for a month: done, or stalled?
- Topic notes on the same subject that could be merged

Propose a fix for each, and change only what the user approves.

## Reply

Say which topic note changed, whether it's new, what went in, and the pointer memo in the daily note. Name new notes explicitly, so the vault never grows without the user noticing.
