## ✨ ChangeMe
좋은 습관 만들기

"습관 있는 삶"을 위한 루틴 관리 도구입니다.

### 🛠️ 프로젝트 소개
습관을 지속하는 것은 쉽지 않습니다.

ChangeMe는 좋은 습관을 만들어 나가기 위한
계획 + 루틴 + 기록 관리 공간을 제공합니다.

### 📝 기획 의도

하루를 기록하고,

루틴을 반복하고,

목표를 유지할 수 있도록!

### 👨‍👩‍👧‍👦 팀원 소개
| 이름 | 프로필 |
|:---:|:---:|
| **이건** | [<img src="https://avatars.githubusercontent.com/u/124166842?s=64&v=4" width="100" />](https://github.com/leegeon-spinachSW) |
| **박은지** | [<img src="https://avatars.githubusercontent.com/u/149561623?s=64&v=4" width="100" />](https://github.com/EJ-99) |
| **권우진** | [<img src="https://avatars.githubusercontent.com/u/57216021?s=64&v=4" width="100" />](https://github.com/wojin57) |
| **박찬우** | [<img src="https://avatars.githubusercontent.com/u/58602643?s=64&v=4" width="100" />](https://github.com/pcw7) |

## 🖥️ 기술 스택
Next.js, TypeScript, SCSS, Supabase, Zustand, SWR, GitHub, Figma

## 🏗️ 프로젝트 구조 (Clean Architecture 기반)
app/

├── 📂 api/                    # API 구현<br/>
├── 📂 (pages)/                 # 페이지 구성<br/>
├── 📂 application/<br/>
│   └── 🧩 usecase/             # 비즈니스 로직 흐름<br/>
├── 📂 domain/<br/>
│   ├── 📄 entities/            # 도메인 엔티티 정의<br/>
│   └── 📄 repositories/        # 데이터 접근 인터페이스<br/>
├── 📂 infra/<br/>
│   └── 🗄️ repositories/        # Supabase 기반 실제 repository 구현<br/>
├── 📂 stores/                  # 전역 상태 관리<br/>
├── 📂 utils/                   # 공통 유틸 함수<br/>
├── 📂 hooks/                   # 커스텀 훅<br/>
└── 📂 public/                  # 정적 파일 (이미지, 폰트)

## 🌟 주요 기능


| 기능 | 이미지 |
|------|--------|
| **모두의 습관** | <img src="public/images/ReadmeHabit.png" width="400" /> |
| **오늘의 루틴** | <img src="public/images/ReadmeDailyRoutine.png" width="400" /> |
| **기록 보기** | <img src="public/images/ReadmeRecord.png" width="400" /> |
| **데일리 메시지** | <img src="public/images/ReadmeMessage.png" width="400" /> |
| **카테고리 관리** | <img src="public/images/ReadmeCategory.png" width="400" /> |
| **회원가입** | <img src="public/images/ReadmeJoin.png" width="400" /> |
| **로그인** | <img src="public/images/ReadmeLogin.png" width="400" /> |
| **비밀번호 변경** | <img src="public/images/ReadmePasswordChange.png" width="400" /> |
| **마이페이지** | <img src="public/images/ReadmeMyPage.png" width="400" /> |


