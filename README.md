# skills

Claude 에이전트 스킬 모음. [skills.sh](https://www.skills.sh) CLI로 필요한 스킬만 골라 설치한다.

## 설치

프로젝트 루트에서 아래 명령을 실행하고 새 세션을 시작한다. `--skill` 옵션으로 원하는 스킬 하나를 고른다.

```bash
npx skills add raycon/skills --skill <스킬 이름>
```

저장소의 모든 스킬을 한 번에 설치하려면 옵션 없이 실행한다.

```bash
npx skills add raycon/skills
```

CLI 없이 쓰려면 저장소를 클론한 뒤 스킬 폴더를 Claude 스킬 디렉터리에 둔다. 전역으로 쓰려면 `~/.claude/skills/`, 프로젝트 단위로 쓰려면 그 프로젝트의 `.claude/skills/`에 둔다.

```bash
git clone https://github.com/raycon/skills.git
cp -r skills/<스킬 이름> ~/.claude/skills/
```

## 스킬 목록

### 한국어 글쓰기

| 스킬 | 설명 |
|---|---|
| `korean-punctuation` | 국립국어원 「문장 부호」 규정(2015. 1. 1. 시행)의 요약. 가로쓰기 24종의 용법과 띄어쓰기를 부호 선택표로 정리하고, 세부 규정은 참조 문서로 분리했다. 어떤 부호가 맞는지 판단하는 근거로 쓴다. |
| `korean-punctuation-style` | 문장 부호를 과하게 쓰지 않도록 돕는 스타일 지침. 단순 나열에 가운뎃점을 남발하거나 줄임표, 줄표, 느낌표를 불필요하게 쓰는 경향을 교정한다. 단독으로 작동한다. |

### Obsidian

| 스킬 | 설명 |
|---|---|
| `daily-note` | Obsidian Vault의 오늘 일일노트를 만들고 기록한다. 템플릿으로 노트를 만들고, 하이라이트, 작업, 메모, 참고, 감사, 리뷰 섹션에 맞춰 기존 내용을 덮어쓰지 않고 추가한다. |

### Claude Code

| 스킬 | 설명 |
|---|---|
| `init-statusline` | 두 줄 상태줄을 설치한다. 첫 줄은 경로, 둘째 줄은 모델 (effort), 컨텍스트 사용량 막대, 5h/7d 사용 한도와 리셋 시각이다. 기존 상태줄은 백업하고 `settings.json`의 다른 설정은 건드리지 않는다. Node가 필요하다. |

## 구조

각 스킬은 `skills/` 아래 자체 폴더에 들어 있고, 폴더 이름이 곧 스킬 이름이다.

```
skills/
└── <스킬 이름>/
    ├── SKILL.md          # 필수: 메타데이터와 지침
    ├── references/       # 선택: 세부 문서
    ├── scripts/          # 선택: 실행 스크립트
    └── assets/           # 선택: 설치하거나 출력에 쓰는 파일
```
