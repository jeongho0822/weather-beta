# Vercel 배포 체크리스트

## 1. 프로젝트 준비 ✅
- [x] HTML/CSS/JS 파일 준비
- [x] vercel.json 설정
- [x] .gitignore 설정
- [x] WeatherAPI.com XML API 통합

## 2. Vercel 배포 전 확인사항
- [ ] GitHub에 푸시됨
- [ ] WeatherAPI.com API 키 발급받음
- [ ] Vercel 계정 생성함

## 3. Vercel 배포 단계
```bash
# 1단계: Vercel CLI 설치
npm install -g vercel

# 2단계: Vercel 로그인
vercel login

# 3단계: 프로젝트 배포
cd c:\Users\wjdgh\OneDrive\Desktop\weather-app
vercel
```

## 4. Vercel 환경변수 설정
배포 후:
1. Vercel 대시보드 접속
2. 프로젝트 선택
3. **Settings** → **Environment Variables**
4. 변수 추가:
   - **Name**: VITE_WEATHER_API_KEY
   - **Value**: [WeatherAPI.com API 키]
   - **Environments**: Production 선택
5. 프로젝트 재배포 또는 **Deployments** → 최신 배포 → **Redeploy**

## 5. 확인 사항
- [ ] 배포된 URL 접속 가능
- [ ] API 키 설정 후 날씨 데이터 로드됨
- [ ] 도시 검색 기능 작동
- [ ] 현재 위치 기능 작동 (HTTPS 필수)

## API 키 없을 때 설명
사용자가 API 키 없이 접속하면 다음 메시지 표시:
```
API 키 설정 필요

Vercel 배포: Settings → Environment Variables
변수명: VITE_WEATHER_API_KEY

로컬 테스트: 콘솔에서 setApiKey("your_key")
```

## 주의사항
⚠️ API 키는 절대 코드에 포함하지 마세요
⚠️ .gitignore에 .env 파일 등록됨
⚠️ Vercel 환경변수로만 관리하세요
