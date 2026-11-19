---
name: people-notes
description: Keep one note per person in a Markdown vault (Obsidian or similar), like a personal CRM. It creates person notes from the template, logs calls, messages, meetings and life events, keeps lasting facts with the date they were learned, tracks last contact and follow-ups, and resolves who is meant when names collide. Use this skill whenever the user talks about contact with someone or something they learned about a person, in any wording ("엄마랑 통화했어", "민수 이직했대", "다은이 생일 3월 2일이야", "다음에 만나면 물어볼 것", "부의금 보냈어", "오랜만에 지훈이 만났어"), when a phone-call transcript needs to go into the vault, or when they ask about someone ("민수 마지막으로 연락한 게 언제지?", "연락 뜸한 사람 누구야").
---

# People Notes

Keep what the user knows about the people in their life in one place per person, so that before the next call or visit they can see what was talked about last time, what changed, and what they promised.

A person note is useful only if it stays trustworthy. So it holds facts the user actually learned, keeps old facts instead of overwriting them, and never guesses who someone is.

## Learn the vault's conventions first

Read the vault's project instructions (`CLAUDE.md`, `AGENTS.md`, or similar), the person template, and a couple of existing person notes. Follow them over these defaults:

| Thing | Default |
| --- | --- |
| Location | `People/<name>.md`, created from the person template if one exists |
| Frontmatter | `aliases` (nicknames, titles, other spellings), `birthday: "MM-DD"`, `last_contact: "YYYY-MM-DD"`, `cadence` (contact goal such as `1개월`), tags `people/<relation>` (`people/family`, `people/work`) |
| Sections | Summary, Relationship, Info (Work, Life, Interests, Dates), Log, Next contact |

## Find the right person

1. Look for an existing note by file name, then by `aliases`.
2. If two people could match, or a name is shared, ask who is meant before writing. Writing into the wrong person's note is worse than writing nothing.
3. If you can't ask (an automated transcript) and the person can't be identified, don't touch any person note. Leave a line in the daily note and ask in the reply.
4. Organizations (a clinic, a shop, a company) don't get person notes. Their information goes in a fitting topic note, or in the daily note.

## Create a person

- The file name is the name the user uses for them. A title or nickname is fine when that's how they're saved or called (`엄마.md`, `민수형.md`). Put other names in `aliases`
- When a second person with the same name appears, add where each was first met in parentheses (`김민수 (회사).md`, `김민수 (대학).md`). Renaming an existing note needs the user's confirmation, and links to it must be updated after the rename
- Fill only what you know. Leave the rest of the template empty

## What goes where

| Section | Content |
| --- | --- |
| Summary | Who they are in one line (아내, 전 회사 팀장) |
| Relationship | When and where they first met, who introduced them, mutual friends. Link people as `[[name]]` |
| Info | Facts that stay true for a while, without checkboxes or source links. Facts that never change (family relations, school) have no date. Facts that can change (job, neighborhood, tastes) start with the date they were learned in backticks: ``- `2026-11-13` OO회사 마케팅팀``. When one changes, add a new line and keep the old one |
| Log | Calls, messages, meetings, events, in date order: `- YYYY-MM-DD <icon> <kind>`, with the details as sub-items |
| Next contact | Things to ask, favors and promises, as `- [ ]`. Mark `[x]` when done. A follow-up with a fixed date also goes in the daily note's tasks |

Default log icons: ☎️ call, 💬 message, 🤝 meeting, 🚑 medical visit, 🎁 gift or celebration, 🎗️ condolence. If there's a source recording, link it on the icon with the time as the label: `- 2026-11-13 ☎️[[통화 김민수_261113_143012|14:30]] 통화`.

After adding a log entry, set `last_contact` to that date if it's later than the current one.

## Calls from transcripts

- Summarize the call into the Log entry's sub-items. Promises and things to ask next time go to Next contact or tasks
- Transcripts usually have no speaker labels, so it can be unclear who said what. Put a fact in Info only when it's clearly about this person. Otherwise keep it in the Log sub-items
- In the daily note, leave one line that links the person and the recording: ``- [`HH:MM`](<통화 김민수_261113_143012.md>) ☎️ [[김민수]] 통화, 이직 준비 중``. The details live only in the person note

## The daily note line

Any contact gets a single line in that day's daily note memos, pointing to the person: ``- `HH:MM` ☎️ [[김민수]] 통화``. `HH:MM` is the clock time the user gave, or else the current time; don't guess one from "점심". Don't copy the details there. If a daily-note skill is available, follow it for the line format.

## Privacy

Don't store phone numbers, addresses, or ID numbers. Keep only what helps the relationship: what's going on in their life, what they care about, what was promised. Link related notes both ways (a condolence gift note and the person, for example).

## Questions about people

For "마지막으로 연락한 게 언제지?" read `last_contact` and the latest Log entries. For "연락 뜸한 사람" compare `last_contact` with `cadence` across person notes and list who is overdue, oldest first. These requests only read; don't edit anything.

## Reply

Say which person note changed and what was added (log, info, next contact), plus the daily note line. Ask about anyone you couldn't identify.
