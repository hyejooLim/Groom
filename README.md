# ☁️ Groom
**Next.js & TypeScript 기반의 개인화 블로그 플랫폼**  
SEO 최적화와 렌더링 성능, 상태 관리 아키텍처 개선에 집중하여 개발한 블로그 서비스입니다.

---

## 🛠 Tech Stack

### **Frontend**
- **Core:** Next.js, React, TypeScript
- **State Management:** TanStack Query (React Query), Zustand (Recoil 마이그레이션 완료)
- **Styling:** Tailwind CSS, Material UI (MUI), clsx
- **Editor:** TinyMCE

### **Backend & Database**
- **ORM:** Prisma
- **Database:** Neon (Serverless PostgreSQL)

---

## 🌟 Key Features & Architecture

### 1. **상태 관리 아키텍처 리팩토링 및 성능 최적화**
- **전역 상태 마이그레이션 (Recoil → Zustand):** 불필요한 전역 상태를 제거하고 컴포넌트 단위 단방향 데이터 흐름으로 구조 개선
- **`useRef` 기반 렌더링 최적화:** TinyMCE 에디터 인스턴스를 전역 상태에서 분리하여 `useRef` 및 Props Drilling/Ref Forwarding 패턴으로 관리, 불필요한 리렌더링 제거 및 메모리 효율화
- **서버 상태 효율화:** TanStack Query를 도입하여 게시글 및 카테고리 데이터의 비동기 캐싱 및 서버 상태 동기화 구현

### 2. **사용자 경험 및 렌더링 최적화 (SEO)**
- **SSR / SSG 하이브리드 전략:** 게시글 상세 및 카테고리 페이지에 Dynamic Routing과 SSR/SSG를 적절히 도입하여 초기 로딩 속도 최적화 및 검색 엔진 노출 극대화
- **디자인 시스템 개선:** Ant Design에서 Material UI 및 Tailwind CSS 구조로 마이그레이션하여 UI 모듈화 및 디자인 일관성 확보

---

## ⚙️ Getting Started
### 1. Environment Variables
`.env` 파일에 데이터베이스 연결 URL을 설정합니다. ([Neon Console](https://console.neon.tech/app/projects/small-sun-80744943?branchId=br-soft-queen-a1sc6zsp&database=neondb))
```
DATABASE_URL=postgresql://neondb_owner:*************@ep-patient-art-a1wy8jp1-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### 2. Installation & DB Setup
```
# 패키지 설치
npm install

# 기존 Schema 가져오기
npx prisma db pull

# Prisma Schema 동기화
npx prisma db push

# Prisma Studio (DB 관리자 패널) 실행
npx prisma studio

# 로컬 개발 서버 실행
npm run dev
```
