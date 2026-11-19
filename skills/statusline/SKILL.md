---
name: statusline
description: Claude Code 상태줄(statusline)을 미리 만든 두 줄 구성으로 설치한다. 첫 줄은 경로, 둘째 줄은 모델 (effort), 컨텍스트 사용량 막대, 5h/7d 사용 한도와 리셋 시각이다. "statusline 설정", "상태줄 만들어줘", "init statusline", 새 컨테이너나 새 머신에서 Claude Code 환경을 맞출 때, 상태줄에 컨텍스트나 사용 한도를 보이게 해달라고 할 때 이 스킬을 쓴다. 설치한 상태줄의 색, 순서, 항목을 바꿔달라는 요청에도 쓴다.
---

# statusline

`assets/statusline.js`를 Claude 설정 폴더에 복사하고 `settings.json`의 `statusLine`이 그 파일을 실행하게 한다. Node만 있으면 된다.

## 설치

```bash
node <이 스킬 폴더>/scripts/install.js
```

- 설정 폴더는 `$CLAUDE_CONFIG_DIR`, 없으면 `~/.claude`다. 다른 폴더에 설치하려면 경로를 인자로 넘긴다.
- 기존 `statusline.js`가 내용이 다르면 `statusline.js.bak`으로 백업하고 덮어쓴다. 사용자가 손본 상태줄일 수 있으니, 설치 전에 기존 파일이 있는지 보고 덮어쓴다는 사실을 사용자에게 알린다.
- `settings.json`은 `statusLine.type`과 `statusLine.command`만 바꾸고 나머지 키는 그대로 둔다. JSON이 깨져 있으면 아무것도 바꾸지 않고 멈춘다.
- 설치 결과는 스크립트 출력(`[installed]`, `[backup]`, `[settings]`)을 그대로 전한다.

설치 후 확인:

```bash
echo '{"cwd":"/workspace","model":{"display_name":"Opus 5.5"},"effort":{"level":"high"},"context_window":{"used_percentage":42,"context_window_size":1000000},"rate_limits":{"five_hour":{"used_percentage":65,"resets_at":'$(( $(date +%s) + 3600 ))'}}}' \
  | node "${CLAUDE_CONFIG_DIR:-$HOME/.claude}/statusline.js" | sed 's/\x1b\[[0-9;]*m//g'
```

Claude Code는 설정 변경을 바로 반영하므로 재시작은 필요 없다. 다음 응답부터 새 상태줄이 보인다.

## 표시 형식

```
/workspace/repo
Opus 5.5 (high) | ▓▓▓▓░░░░░░ 42% 420k/1.0M | 5h 65% 19:22 | 7d 12% 토 23:50
```

| 항목 | 내용 | 색 (256색) |
|---|---|---|
| 경로 | `workspace.current_dir`, 없으면 `cwd` | `245` 회색 |
| 모델 | 이름에 haiku, sonnet, opus가 들어가면 각각 노랑, 초록, 파랑. 그 밖은 빨강 | `220`, `114`, `75`, `196` |
| effort | 괄호 안에 표시. low, medium, high는 노랑, 초록, 파랑. 그 밖(xhigh, max)은 빨강 | 모델과 같은 팔레트 |
| 컨텍스트 | 10칸 막대와 %, 쓴 양/전체 크기. 토큰 단위는 SI 표기(`k`, `M`) | 막대: 단계 색. 쓴 양 `250`, `/전체` `245` |
| 5h, 7d | 라벨, 사용 %, 리셋 시각. 7d는 요일을 붙인다 | 라벨 `111`, `177`. %: 단계 색. 시각 `180` |
| 구분자 | `\|` | `240` |

단계 색은 40 미만 초록 `114`, 40~59 노랑 `220`, 60~79 주황 `208`, 80 이상 빨강 `196`이다.

값이 없는 항목은 빼고 출력한다. 맨 끝의 공백 한 칸은 터미널이 마지막 칸을 자르지 않게 하려고 둔 것이라 지우지 않는다.

## 상태줄 바꾸기

색, 순서, 항목을 바꿔달라는 요청이면 설치된 `statusline.js`를 고친다. 고친 뒤 위 확인 명령으로 출력을 보여준다. 다음 설치에도 같은 모양이 나와야 하면 `assets/statusline.js`에도 같은 변경을 반영할지 사용자에게 묻는다.

색은 모두 256색(`38;5;N`)으로 맞춘다. 기본 ANSI 색(`31`~`37`)은 터미널 테마마다 실제 색이 달라져서 단계 구분이 흐려진다. 굵게(`01`)는 쓰지 않는다. 터미널이 굵은 글씨를 더 밝게 그려 같은 색 코드도 다르게 보인다.
