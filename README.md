# Weather App - WeatherAPI 날씨 애플리케이션

## 개요
WeatherAPI.com에서 날씨 데이터를 불러오는 현대적인 웹 애플리케이션입니다.

## 기능
- 실시간 날씨 정보 (기온, 체감온도, 습도 등)
- 전세계 도시 날씨 검색
- GPS 기반 현재 위치 날씨 조회
- XML API 데이터 파싱
- 반응형 디자인

## API 설정

### 1. WeatherAPI.com API 키 발급
1. [WeatherAPI.com](https://www.weatherapi.com/) 방문
2. 무료 계정 생성
3. API 키 발급

### 2. Vercel 배포 시 환경변수 설정
Vercel 대시보드에서:
1. **Settings** → **Environment Variables**
2. 다음 변수 추가:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

### 3. 로컬 테스트
브라우저 콘솔에서:
```javascript
setApiKey("your_api_key_here")
```

## 배포
```bash
# Vercel에 로그인
vercel login

# 배포
vercel
```

## 기술 스택
- HTML5
- CSS3 (글래스모피즘)
- JavaScript (Vanilla)
- WeatherAPI.com (XML API)
- Vercel (호스팅)

## 파일 구조
```
weather-app/
├── index.html      # HTML 구조
├── style.css       # 스타일시트
├── script.js       # 메인 로직
├── vercel.json     # Vercel 배포 설정
└── .gitignore      # Git 무시 파일
```
