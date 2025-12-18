# ���️ Timetable - 시간표 및 일정 관리

Node.js + Express.js 백엔드와 Vite 프론트엔드로 구성된 시간표 및 일정 관리 애플리케이션입니다.

## ��� 시작하기

### 1. 환경변수 설정
`.env` 파일에 Supabase 정보를 입력하세요:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. 패키지 설치
```bash
npm run install:all
```

### 3. 개발 서버 실행
```bash
npm run dev
```
- 클라이언트: http://localhost:3000
- 서버: http://localhost:5000

### 4. 프로덕션 빌드
```bash
npm run build
npm start
```

## ��� 주요 명령어

- `npm run dev` - 개발 서버 실행 (클라이언트 + 서버)
- `npm run build` - 프로덕션 빌드
- `npm start` - 프로덕션 서버 실행
- `npm run client:dev` - 클라이언트만 실행
- `npm run server:dev` - 서버만 실행

## ��� 프로젝트 구조

```
timetable/
├── client/          # 프론트엔드 (Vite)
├── server/          # 백엔드 (Express)
└── package.json     # 루트 설정
```

자세한 내용은 문서를 참고하세요.
