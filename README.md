# 🚀 Directional Assignment

### 배포 링크: https://directional-frontend-assignment-iota.vercel.app

## ⚙️ 프로젝트 실행 방법

### 1. 환경 변수 설정

프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 아래 내용을 입력해야 합니다.

```text
VITE_BASE_URL=기본_API_주소
VITE_POSTS_BASE_URL=Posts_엔드포인트를_포함한_URL
VITE_MOCK_BASE_URL=Mocks_엔드포인트를_포함한_URL
VITE_AUTH_EMAIL=테스트_계정_이메일
VITE_AUTH_PASSWORD=테스트_계정_비밀번호
```

```
# 의존성 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

## 🛠 사용 기술 스택

### 1. Framework & Core

- **React 19**
- **TypeScript**
- **Vite**

### 2. State Management & Data Fetching

- **@tanstack/react-query (v5)**
- **Axios**

### 3. Data Visualization

- **Recharts**

### 4. UI Library & Styling

- **Tailwind CSS (v4)**
- **Shadcn/UI**
- **@tanstack/react-table**

### 5. Utility

- **React Router Dom (v7)**
- **Dayjs**

## ✨ 주요 기능

### 게시판

- 게시글 CRUD 및 테이블 기반 목록 UI 구현
- 컬럼 너비 조절 및 표시 여부 제어
- 검색, 정렬, 카테고리 필터링 기능
- 무한 스크롤 기반 페이지네이션
- 금칙어 포함 시 게시글 등록 제한
- 게시판 CRUD 테스트를 위해 사용자 아이디를 `u_mock_1`로 임시 고정하여 사용

### 데이터 시각화

- Bar / Donut / Stacked Bar / Area / Multi-Line 차트 구현
- 범례를 통한 데이터 표시/숨김 제어
- Hover 시 데이터 상세 툴팁 제공
- 팀별 데이터 구분 및 시각적 일관성 유지
