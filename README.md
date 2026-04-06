# ☁️ Groom
Next.js와 TypeScript 기반으로 개발한 **공유 블로그 서비스**입니다.  
사용자가 게시글을 작성하고 공유할 수 있으며, SEO 최적화와 서버 렌더링을 통해 사용자 경험과 성능을 함께 고려한 프로젝트입니다.

</br>

## 🧩 주요 기능

- 게시글 작성 / 수정 / 삭제 (CRUD)
- Rich Text Editor(TinyMCE)를 활용한 콘텐츠 작성
- Dynamic Routing 기반 게시글 상세 페이지 구성
- React Query를 활용한 서버 상태 관리 및 데이터 캐싱
- SEO 최적화를 위한 SSR / SSG 적용

</br>

## 🌳 기술 스택

### Frontend
- **Next.js**
  - SSR / SSG를 활용한 렌더링 최적화
  - Dynamic Routing 기반 페이지 구조 설계
- **React**
  - 재사용 가능한 컴포넌트 설계
- **TypeScript**
  - 정적 타입을 통한 안정성 확보
- **React Query**
  - 서버 상태 관리 및 비동기 데이터 처리
- **Recoil**
  - 전역 상태 관리
- **Tailwind CSS / MUI (Material UI)**
  - Tailwind 기반 유틸리티 스타일링 + MUI 컴포넌트 활용
  - Ant Design → MUI 마이그레이션 진행 중
  - clsx를 활용한 조건부 스타일 관리
  - 컴포넌트 구조 개선 및 디자인 시스템 일관성 확보를 위한 리팩토링 수행
- **TinyMCE**
  - Rich Text Editor 적용

### Backend & DB
- **Prisma**
  - ORM 기반 데이터 모델링 및 DB 관리
- **Neon (PostgreSQL)**
  - 클라우드 DB 사용

</br>

## 🚀 프로젝트 실행
### 1. 환경 변수 설정
`.env` 파일에 DB URL 추가 ([Neon Console](https://console.neon.tech/app/projects/small-sun-80744943?branchId=br-soft-queen-a1sc6zsp&database=neondb))
```
DATABASE_URL=postgresql://neondb_owner:*************@ep-patient-art-a1wy8jp1-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### 2. 패키지 설치
```
npm install
```

### 3. DB 설정
```
# 기존 DB 가져오기
npx prisma db pull

# DB 최초 생성
npx prisma db push
```

### 4. DB 확인 (관리자 패널)
```
npx prisma studio
```

### 5. 로컬 서버 실행
```
npm run dev
```

