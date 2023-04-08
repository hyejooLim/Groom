# Groom
☁️ `Next.js`, `TypeScript`로 개발한 공유 블로그

</br>

## 🌳 기술 스택

> ### FrontEnd
* Next.js
* React
* Recoil
* React Query
* TypeScript
* Ant Design
* Styled Components
* TinyMCE (Editor)

<br />

> ### API ENDPOINT 및 DB 생성
* Prisma
* PlanetScale

</br>

## 🚀 프로젝트 실행
### 1. 프로젝트 초기 세팅
```
npm install
```

</br>

### 2. pscale 로그인
```
pscale auth login

// 위 명령어 실행으로 `certificate is not standards compliant` error 발생 시
sudo pscale auth login
```

</br>

### 3. Database에 연결
```
// pscale connect [DB 이름] [Branch 이름]
pscale connect groom develop
```

</br>

### 4. Prisma와 Database 연결
`Local address`를 .env 파일의 DATABASE_URL 키값에 삽입

</br>

.env
```
DATABASE_URL=mysql://Local address/groom
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
