---
name: people-notes
description: Keep one note per person in a Markdown vault (Obsidian or similar), like a personal CRM. It creates person notes from the template, logs calls, messages, meetings and life events, keeps lasting facts with the date they were learned, tracks last contact and follow-ups, and resolves who is meant when names collide. Use this skill whenever the user talks about contact with someone or something they learned about a person, in any wording ("talked to mom", "Minsu changed jobs", "her birthday is March 2", "ask him next time", "sent condolence money", "ran into an old friend"), when a phone call needs to be logged, or when they ask about someone ("when did I last talk to Minsu?", "who haven't I talked to in a while?").
---

# People Notes

Keep what the user knows about the people in their life in one place per person, so that before the next call or visit they can see what was talked about last time, what changed, and what they promised.

A person note is useful only if it stays trustworthy. So it holds facts the user actually learned, keeps old facts instead of overwriting them, and never guesses who someone is.

## Learn the vault's conventions first

Read the vault's project instructions (`CLAUDE.md`, `AGENTS.md`, or similar), the person template, and a couple of existing person notes. Follow them over these defaults:

| Thing | Default |
| --- | --- |
| Location | `People/<name>.md`, created from the person template if one exists |
| Frontmatter | `aliases` (nicknames, titles, other spellings), `birthday: "MM-DD"`, `last_contact: "YYYY-MM-DD"`, tags `people/<relation>` (`people/family`, `people/work`) |
| Sections | Summary, Relationship, Info (Work, Life, Interests, Dates), Log, Next contact |

## Find the right person

1. Look for an existing note by file name, then by `aliases`.
2. If two people could match, or a name is shared, ask who is meant before writing. Writing into the wrong person's note is worse than writing nothing.
3. If you can't ask (an automated transcript) and the person can't be identified, don't touch any person note. Say so in the reply.
4. Organizations (a clinic, a shop, a company) don't get person notes. Leave their information out and say so in the reply.

## Create a person

- The file name is the name the user uses for them. A title or nickname is fine when that's how they're saved or called (`Mom.md`, `Uncle Joe.md`). Put other names in `aliases`
- When a second person with the same name appears, add where each was first met in parentheses (`Alex Kim (work).md`, `Alex Kim (college).md`). Renaming an existing note needs the user's confirmation, and links to it must be updated after the rename
- Fill only what you know. Leave the rest of the template empty

## What goes where

| Section | Content |
| --- | --- |
| Summary | Who they are in one line (wife, former team lead) |
| Relationship | When and where they first met, who introduced them, mutual friends. Link people as `[[name]]` |
| Info | Facts that stay true for a while, without checkboxes or source links. Facts that never change (family relations, school) have no date. Facts that can change (job, neighborhood, tastes) start with the date they were learned in backticks: ``- `2026-11-13` Marketing at Acme``. When one changes, add a new line and keep the old one |
| Log | Calls, messages, meetings, events, in date order: `- YYYY-MM-DD <icon> <kind>`, with the details as sub-items |
| Next contact | Things to ask, favors and promises, as `- [ ]`. Mark `[x]` when done |

Default log icons: ☎️ call, 💬 message, 🤝 meeting, 🚑 medical visit, 🎁 gift or celebration, 🎗️ condolence. If there's a source recording, link it on the icon with the time as the label: `- 2026-11-13 ☎️[[통화 김민수_261113_143012|14:30]] call`.

After adding a log entry, set `last_contact` to that date if it's later than the current one.

## Calls from transcripts

- Summarize the call into the Log entry's sub-items. Promises and things to ask next time go to Next contact
- Transcripts usually have no speaker labels, so it can be unclear who said what. Put a fact in Info only when it's clearly about this person. Otherwise keep it in the Log sub-items

## Privacy

Don't store phone numbers, addresses, or ID numbers. Keep only what helps the relationship: what's going on in their life, what they care about, what was promised. Link related notes both ways (a condolence gift note and the person, for example).

## Questions about people

For when they last talked to someone, read `last_contact` and the latest Log entries. For who they haven't talked to in a while, list person notes by `last_contact`, oldest first. These requests only read; don't edit anything.

## Reply

Say which person note changed and what was added (log, info, next contact). Include a one-line summary of the contact and any follow-up with a fixed date, so they can be logged elsewhere (a daily log, a task list). Ask about anyone you couldn't identify.
