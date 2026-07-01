# 데이터 주권 프로젝트 (Data Sovereignty Project)

전 세계 소수자 공동체의 얼굴, 목소리, 이동 경로, 언어는 매일 어딘가의 모델을 학습시키는 데 쓰인다. 대부분 동의 없이, 대부분 이익 없이. 이 프로젝트는 그 흐름을 눈에 보이게 만든다.

## 📋 프로젝트 개요

- **프론트엔드**: React + TypeScript
- **백엔드**: Node.js + Express
- **데이터베이스**: PostgreSQL
- **배포**: 자체 서버

## 🚀 빠른 시작

### 요구사항
- Node.js 18+
- PostgreSQL 14+
- npm 또는 yarn

### 설치 및 실행

#### 1. 저장소 클론
```bash
git clone https://github.com/kookjaehyoun/data-sovereignty-project.git
cd data-sovereignty-project
```

#### 2. 환경 변수 설정
```bash
cp .env.example .env
# .env 파일에서 데이터베이스 정보 수정
```

#### 3. Docker로 PostgreSQL 실행
```bash
docker-compose up -d
```

#### 4. 백엔드 설정 및 실행
```bash
cd backend
npm install
npm run db:migrate
npm run db:seed
npm run dev
# http://localhost:5000
```

#### 5. 프론트엔드 설정 및 실행 (새 터미널)
```bash
cd frontend
npm install
npm start
# http://localhost:3000
```

## 📁 프로젝트 구조

```
data-sovereignty-project/
├── frontend/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/       # 재사용 가능한 컴포넌트
│   │   ├── pages/            # 페이지 컴포넌트
│   │   ├── services/         # API 통신
│   │   ├── styles/           # 스타일시트
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public/
│   └── package.json
│
├── backend/                  # Node.js 백엔드
│   ├── src/
│   │   ├── routes/           # API 라우트
│   │   ├── controllers/       # 비즈니스 로직
│   │   ├── models/           # 데이터베이스 모델
│   │   ├── middleware/       # 미들웨어
│   │   ├── db/
│   │   │   ├── migrations/   # DB 마이그레이션
│   │   │   └── seeds/        # 초기 데이터
│   │   └── server.ts
│   ├── .env.example
│   └── package.json
│
├── .env.example              # 환경 변수 예시
├── docker-compose.yml        # Docker 설정
└── README.md
```

## 🔧 주요 기능

### 공개 기능
- ✅ 사례 목록 조회
- ✅ 사례 제보 (익명)
- ✅ 원칙 및 정보 열람

### 관리자 기능
- 🔐 관리자 로그인
- 📊 모든 제보 관리
- ✏️ 사례 편집/삭제
- 📈 통계 대시보드

## 📚 API 문서

### 공개 API
- `GET /api/cases` - 모든 사례 조회
- `GET /api/cases/:id` - 특정 사례 조회
- `POST /api/reports` - 사례 제보

### 관리자 API (인증 필요)
- `POST /api/admin/login` - 로그인
- `GET /api/admin/reports` - 모든 제보 조회
- `PUT /api/admin/reports/:id` - 제보 수정
- `DELETE /api/admin/reports/:id` - 제보 삭제
- `GET /api/admin/stats` - 통계

## 🔐 보안

- JWT 토큰 기반 인증
- CORS 설정
- SQL Injection 방지 (Prepared Statements)
- 비밀번호 해싱 (bcrypt)

## 📝 라이선스

MIT License

## 📧 문의

프로젝트에 대한 질문이나 제안은 이슈를 통해 주세요.
