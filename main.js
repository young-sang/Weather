const inputLatitude = document.getElementById("input-latitude");
const inputLongitude = document.getElementById("input-longitude");
const submitBtn = document.getElementById("submitBtn");

const todayBest = document.getElementById("today-best");
const tomorrowBest = document.getElementById("tomorrow-best");
const dayAfterTomorrowBest = document.getElementById("day-after-tomorrow-best");


const todayLess = document.getElementById("today-less");
const tomorrowLess = document.getElementById("tomorrow-less");
const dayAfterTomorrowLess = document.getElementById("day-after-tomorrow-less");

// 현재 위치 가져오기
if ("geolocation" in navigator) {
navigator.geolocation.getCurrentPosition(
    (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log("위도:", lat);
        console.log("경도:", lon);

        // 지도 생성 (현재 위치 중심)
        const map = L.map('map').setView([lat, lon], 13);

        // 타일 불러오기
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);


        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=Asia/Seoul`)
        .then(response => response.json())
        .then(data => {
            console.log("날씨 데이터:", data);
            const daily = data.daily;
            console.log("최고기온:", daily.temperature_2m_max);
            console.log("최저기온:", daily.temperature_2m_min);
            
            todayBest.innerText = daily.temperature_2m_max[0];
            tomorrowBest.innerText = daily.temperature_2m_max[1];
            dayAfterTomorrowBest.innerText = daily.temperature_2m_max[2];

            todayLess.innerText = daily.temperature_2m_min[0];
            tomorrowLess.innerText = daily.temperature_2m_min[1];
            dayAfterTomorrowLess.innerText = daily.temperature_2m_min[2];
        });
    
    },
    (error) => {
        console.error("위치 정보를 가져오지 못했습니다.", error);
    }
);
} else {
    console.log("이 브라우저는 Geolocation을 지원하지 않습니다.");
}

submitBtn.addEventListener("click", () => {
    const latitude = inputLatitude.value;
    const longitude = inputLongitude.value;
    console.log(latitude);
    // 지도 생성 (현재 위치 중심)

    if (document.getElementById('map')._leaflet_id) {
          // 기존 지도 제거
        L.DomUtil.get('map')._leaflet_id = null;
    }
    const map = L.map('map').setView([latitude, longitude], 13);

    // 타일 불러오기
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);


    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=Asia/Seoul`)
    .then(response => response.json())
    .then(data => {
        console.log("날씨 데이터:", data);
        const daily = data.daily;
        console.log("최고기온:", daily.temperature_2m_max);
        console.log("최저기온:", daily.temperature_2m_min);
        
        todayBest.innerText = daily.temperature_2m_max[0];
        tomorrowBest.innerText = daily.temperature_2m_max[1];
        dayAfterTomorrowBest.innerText = daily.temperature_2m_max[2];

        todayLess.innerText = daily.temperature_2m_min[0];
        tomorrowLess.innerText = daily.temperature_2m_min[1];
        dayAfterTomorrowLess.innerText = daily.temperature_2m_min[2];
    });
})


