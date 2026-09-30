# 포트폴리오 — 나를 소개하는 웹페이지

외부 JavaScript 프레임워크 없이 **HTML · CSS · JavaScript**만으로 제작한 반응형 포트폴리오 웹사이트입니다.

HTML의 시맨틱 구조, CSS를 이용한 반응형 레이아웃, JavaScript의 DOM 조작과 이벤트 처리 등을 직접 구현하며 웹페이지의 기본 동작 원리를 학습하는 것을 목표로 제작했습니다.

## 🔗 링크

| 구분 | URL |
| --- | --- |
| 배포 사이트 (GitHub Pages) | https://osh98pro.github.io/my-website/ |
| GitHub 저장소 | https://osh98pro.github.io/my-websit/ |

## 🧩 페이지 구성

| 섹션 | 내용 |
| --- | --- |
| Header | 로고 · 앵커 네비게이션 · 다크 모드 토글 · 모바일 햄버거 메뉴 |
| Hero | 포트폴리오 소개 및 주요 영역 이동 |
| About | 자기소개 및 프로필 정보 |
| Skills | 사용 가능한 기술 스택 소개 |
| Projects | GitHub API를 이용한 GitHub 저장소 목록 |
| Contact | 이름 · 이메일 · 메시지 입력 및 유효성 검사 |
| Footer | 저작권 및 관련 링크 |

## 🛠 사용 기술

- **HTML5**
  - 시맨틱 마크업
  - 앵커 링크를 이용한 페이지 내부 이동
  - 폼 요소 구성

- **CSS3**
  - Flexbox
  - Grid
  - 반응형 레이아웃
  - 다크 모드 스타일
  - 클래스 기반 UI 상태 변경

- **JavaScript (ES6+)**
  - DOM 요소 선택 및 조작
  - `addEventListener()`를 이용한 이벤트 처리
  - 화살표 함수
  - 객체를 이용한 상태 관리
  - 구조 분해 할당

- **GitHub REST API**
  - https://api.github.com/users/osh98pro/repos?sort=updated&per_page=12

## 📁 폴더 구조

```text
my-website/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    └── ...
```

### 파일 역할

- `index.html`
  - 웹페이지의 전체 HTML 구조
  - Header, Hero, About, Skills, Projects, Contact, Footer 등의 영역 구성

- `css/style.css`
  - 전체 디자인
  - 반응형 레이아웃
  - 다크 모드
  - 메뉴 및 애니메이션 스타일

- `js/main.js`
  - DOM 조작
  - 이벤트 처리
  - 다크 모드
  - 스크롤 이벤트
  - 폼 유효성 검사
  - GitHub API 통신
  - 프로젝트 카드 렌더링

## ✅ 요구사항 구현 현황

| 요구사항 | 구현 내용 |
| --- | --- |
| 시맨틱 마크업 | `header` / `nav` / `main` / `section` / `footer`, 카드는 `article`로 렌더링 |
| 앵커 네비게이션 | 모든 섹션으로 이동하는 `#id` 링크 |
| 접근성 | 이미지 `alt`, `<label for>` ↔ `input id` 매칭, 아이콘 버튼 `aria-label` |
| CSS 변수 | `:root`에 색상·폰트·간격 정의, `[data-theme="dark"]`에 다크 모드 변수 별도 정의 |
| Flexbox | 네비게이션(로고 왼쪽 · 메뉴 오른쪽), 버튼 그룹, 태그 목록 |
| Grid | 저장소 카드 `repeat(auto-fit, minmax(280px, 1fr))`, 기술 스택·자격 카드, About 레이아웃 |
| 반응형 | 모바일 퍼스트, 브레이크포인트 **768px**(태블릿) · **1024px**(데스크톱), 모바일에서 햄버거 메뉴 |
| 시각 효과 | 버튼·카드 `hover` + `transition`, 카드 `box-shadow` |
| JS 코드 스타일 | `const` / `let`만 사용, `onclick` 대신 `addEventListener`, 인라인 `style` 없음 |
| 이벤트 | `click` · `submit` · `scroll` · `input` |
| 햄버거 메뉴 | `classList.toggle('active')`로 열기/닫기, 메뉴 링크 클릭 시 자동 닫힘 |
| 부드러운 스크롤 | `scrollIntoView({ behavior: "smooth" })` + CSS `scroll-behavior` |
| 스크롤 탑 버튼 | 300px 이상 스크롤 시 노출, 클릭 시 맨 위로 이동 |
| 네비 스타일 변경 | 60px 이상 스크롤 시 헤더 배경·그림자 적용 |
| 다크 모드 + 상태 유지 | 토글 시 `data-theme` 변경, `localStorage` 저장으로 새로고침 후 유지 |
| 스크롤 애니메이션 | Intersection Observer (`threshold: 0.2`), 한 번 나타나면 관찰 해제 |
| 폼 UX | 이름·이메일·메시지 필수값 검증, 이메일 형식 검증, **입력 즉시(실시간) 피드백**, 필드 바로 아래 에러 메시지, `event.preventDefault()`, 성공 메시지 |
| ES6+ | 화살표 함수, 템플릿 리터럴로 카드 HTML 생성, 구조분해 할당, `map` / `filter` / `forEach` |
| 비동기 · API | `fetch` + `async/await` + `try/catch`로 GitHub API 호출, 로딩 / 성공 / 에러(+다시 시도) / 빈 상태 UI |
| 레이트 리밋 | 403 응답 시 한도 초과 안내와 함께 에러 상태 UI 표시 |


## 동작 기준값
미션에서 "자유 변경 가능하나 README에 명시"하도록 한 값들입니다. js/main.js의 CONFIG 객체에서 관리합니다.

|항목 | 기준값|
|스크롤 탑 버튼 노출 |	스크롤 300px 이상|
|네비게이션 배경 변경 |	스크롤 60px 이상|
|스크롤 애니메이션 (Intersection Observer threshold)|	0.2|