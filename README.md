# Groom
☁️ `Next.js`, `TypeScript`로 개발한 공유 블로그

</br>

## 🌳 기술 스택

> ### FrontEnd
* Next.js
  * SEO (검색 엔진 최적화)
  * pre-render
  * dynamic routing
* React
  * 재사용 가능한 컴포넌트 개발
* Recoil
  * Hook을 통한 React state 전역 관리
* React Query
* TypeScript
* Ant Design
* Styled Components
* TinyMCE (Editor)

<br />

> ### API ENDPOINT 및 DB 생성
* Prisma
* Neon

</br>

## 🚀 프로젝트 실행
### 1. .env 파일에 DB URL 추가 ([Neon Console](https://console.neon.tech/app/projects/small-sun-80744943?branchId=br-soft-queen-a1sc6zsp&database=neondb)에서 확인)
```
DATABASE_URL=postgresql://neondb_owner:npg_DQ0o7Klutrmx@ep-patient-art-a1wy8jp1-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### 2. 패키지 설치
```
npm install
```

</br>

### 3. db pull (DB 존재할 경우)
```
npx prisma db pull
```

</br>

### 4. db push (DB 첫 생성 시)
```
npx prisma db push
```

</br>

### 5. 생성한 DB 확인 (관리자 패널창)
```
npx prisma studio
```

</br>

### 6. 로컬 서버 실행
```
npm run dev
```

</br>
