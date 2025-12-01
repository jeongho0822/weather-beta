// WeatherAPI.com API 키 (실제 사용 시 환경변수로 관리하세요)
const API_KEY = 'your_api_key_here'; // 여기에 실제 API 키를 입력하세요
const API_BASE_URL = 'https://api.weatherapi.com/v1';

// DOM 요소들
const elements = {
    cityInput: document.getElementById('cityInput'),
    searchBtn: document.getElementById('searchBtn'),
    currentLocationBtn: document.getElementById('currentLocationBtn'),
    loading: document.getElementById('loading'),
    weatherInfo: document.getElementById('weatherInfo'),
    errorMessage: document.getElementById('errorMessage'),
    cityName: document.getElementById('cityName'),
    country: document.getElementById('country'),
    temp: document.getElementById('temp'),
    weatherIcon: document.getElementById('weatherIcon'),
    description: document.getElementById('description'),
    feelsLike: document.getElementById('feelsLike'),
    visibility: document.getElementById('visibility'),
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('windSpeed'),
    pressure: document.getElementById('pressure'),
    sunrise: document.getElementById('sunrise'),
    sunset: document.getElementById('sunset')
};

// 날씨 조건에 따른 아이콘 매핑
const weatherIcons = {
    'Sunny': 'fas fa-sun',
    'Clear': 'fas fa-moon',
    'Partly cloudy': 'fas fa-cloud-sun',
    'Partly Cloudy': 'fas fa-cloud-sun',
    'Cloudy': 'fas fa-cloud',
    'Overcast': 'fas fa-cloud',
    'Light rain': 'fas fa-cloud-rain',
    'Moderate rain': 'fas fa-cloud-rain',
    'Heavy rain': 'fas fa-cloud-rain',
    'Light snow': 'fas fa-snowflake',
    'Moderate snow': 'fas fa-snowflake',
    'Heavy snow': 'fas fa-snowflake',
    'Thundery outbreaks possible': 'fas fa-bolt',
    'Patchy rain possible': 'fas fa-cloud-sun-rain',
    'Patchy snow possible': 'fas fa-snowflake',
    'Patchy sleet possible': 'fas fa-cloud-rain',
    'Mist': 'fas fa-smog',
    'Fog': 'fas fa-smog',
    'Freezing fog': 'fas fa-smog'
};

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 이벤트 리스너 등록
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.cityInput.addEventListener('keypress', handleEnterKey);
    elements.currentLocationBtn.addEventListener('click', getCurrentLocationWeather);
    
    // 기본 도시 (서울)의 날씨 로드
    getWeatherByCity('Seoul');
});

// 검색 버튼 클릭 처리
function handleSearch() {
    const city = elements.cityInput.value.trim();
    if (city) {
        getWeatherByCity(city);
    }
}

// 엔터 키 처리
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
}

// 현재 위치 날씨 가져오기
function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        showLoading();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherByCoords(latitude, longitude);
            },
            (error) => {
                console.error('위치 정보를 가져올 수 없습니다:', error);
                showError('위치 정보에 접근할 수 없습니다. 도시명으로 검색해 주세요.');
            }
        );
    } else {
        showError('이 브라우저는 위치 정보를 지원하지 않습니다.');
    }
}

// 도시명으로 날씨 정보 가져오기
async function getWeatherByCity(city) {
    showLoading();
    
    try {
        const response = await fetch(`${API_BASE_URL}/current.json?key=${API_KEY}&q=${city}&lang=ko`);
        
        if (!response.ok) {
            throw new Error('도시를 찾을 수 없습니다.');
        }
        
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('날씨 정보 가져오기 실패:', error);
        showError(error.message || '날씨 정보를 가져오는 중 오류가 발생했습니다.');
    }
}

// 좌표로 날씨 정보 가져오기
async function getWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(`${API_BASE_URL}/current.json?key=${API_KEY}&q=${lat},${lon}&lang=ko`);
        
        if (!response.ok) {
            throw new Error('날씨 정보를 가져올 수 없습니다.');
        }
        
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('날씨 정보 가져오기 실패:', error);
        showError(error.message || '날씨 정보를 가져오는 중 오류가 발생했습니다.');
    }
}

// 날씨 데이터 화면에 표시
function displayWeatherData(data) {
    // 기본 정보
    elements.cityName.textContent = data.location.name;
    elements.country.textContent = data.location.country;
    elements.temp.textContent = `${Math.round(data.current.temp_c)}°`;
    elements.description.textContent = data.current.condition.text;
    elements.feelsLike.textContent = `체감 온도 ${Math.round(data.current.feelslike_c)}°`;
    
    // 날씨 아이콘
    const condition = data.current.condition.text;
    const iconClass = weatherIcons[condition] || 'fas fa-sun';
    elements.weatherIcon.className = iconClass;
    
    // 상세 정보
    elements.visibility.textContent = `${data.current.vis_km} km`;
    elements.humidity.textContent = `${data.current.humidity}%`;
    elements.windSpeed.textContent = `${data.current.wind_kph} km/h`;
    elements.pressure.textContent = `${data.current.pressure_mb} hPa`;
    
    // 일출/일몰 시간 (현재 WeatherAPI의 current endpoint에서는 제공되지 않으므로 대체)
    const now = new Date();
    const sunrise = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 30);
    const sunset = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 30);
    elements.sunrise.textContent = formatTimeFromDate(sunrise);
    elements.sunset.textContent = formatTimeFromDate(sunset);
    
    // 검색창 초기화
    elements.cityInput.value = '';
    
    // 날씨 정보 표시
    showWeatherInfo();
}

// 시간 포맷팅 (UNIX 타임스탬프를 HH:MM 형식으로)
function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}

// Date 객체를 HH:MM 형식으로 포맷팅
function formatTimeFromDate(date) {
    return date.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}

// 로딩 화면 표시
function showLoading() {
    elements.loading.style.display = 'block';
    elements.weatherInfo.style.display = 'none';
    elements.errorMessage.style.display = 'none';
}

// 날씨 정보 표시
function showWeatherInfo() {
    elements.loading.style.display = 'none';
    elements.weatherInfo.style.display = 'block';
    elements.errorMessage.style.display = 'none';
}

// 오류 메시지 표시
function showError(message) {
    elements.loading.style.display = 'none';
    elements.weatherInfo.style.display = 'none';
    elements.errorMessage.style.display = 'block';
    document.getElementById('errorText').textContent = message;
}

// API 키 확인 및 설정 안내
function checkApiKey() {
    if (API_KEY === 'your_api_key_here') {
        showError('WeatherAPI.com API 키를 설정해 주세요. script.js 파일의 API_KEY 변수를 수정하세요.');
        return false;
    }
    return true;
}

// 페이지 로드 시 API 키 확인
window.addEventListener('load', () => {
    checkApiKey();
});