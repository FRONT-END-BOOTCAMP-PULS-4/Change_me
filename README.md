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

├── 📂 api/                    # API 구현
├── 📂 (pages)/                 # 페이지 구성
├── 📂 application/
│   └── 🧩 usecase/             # 비즈니스 로직 흐름
├── 📂 domain/
│   ├── 📄 entities/            # 도메인 엔티티 정의
│   └── 📄 repositories/        # 데이터 접근 인터페이스
├── 📂 infra/
│   └── 🗄️ repositories/        # Supabase 기반 실제 repository 구현
├── 📂 stores/                  # 전역 상태 관리
├── 📂 utils/                   # 공통 유틸 함수
├── 📂 hooks/                   # 커스텀 훅
└── 📂 public/                  # 정적 파일 (이미지, 폰트)

## 🌟 주요 기능
✅ 회원 기능

회원가입 / 로그인 / 비밀번호 변경

마이페이지(프로필 관리)

✅ 습관 관리

새로운 습관 생성, 수정, 삭제

진행 중인 습관 체크

진행률(%) 표시 및 일 수 표시

✅ 기록 보기

완료/실패/포기한 습관 기록 열람

카테고리별/진행 상태별 필터링

✅ 모두의 습관

전체 습관 통계

최근 달성 습관 조회 (비회원도 가능)

✅ 데일리 메시지

오늘의 루틴 하단에 응원 메시지 작성 가능

회원 간 소통 공간

✅ 관리자 기능

카테고리 생성 / 수정 / 삭제

사용량 0인 카테고리만 삭제 가능

## 🎬 시연 화면

로그인 / 로그아웃

프로필 / 비밀번호 변경

오늘의 루틴 관리

기록 보기

모두의 습관 열람

(관리자) 카테고리 관리

403/404 에러 페이지

로딩 애니메이션
