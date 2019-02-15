const section = document.querySelector('section');
const load = document.querySelector('.load');

navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
    console.log(position);
    const crd = position.coords;
    const { latitude, longitude } = crd;
    console.log(latitude, longitude);
    getWeather(latitude, longitude);
}

function error() {
    window.fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(responseJSON => window.fetch(`http://api.ipstack.com/${responseJSON.ip}?access_key=7a58e69107c4f433c33d63d592c74449`)
            .then(res => res.json())
            .then(info => {
                // console.log(info)
                const { latitude, longitude } = info
                getWeather(latitude, longitude)
            })
        )
}


function getWeather(latitude, longitude) {
    window.fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=fr&units=metric&APPID=2522afb2b92d78f94aa033fd3ada0cbb`)
        .then(response => response.json())
        .then(responseJSON => {
            const meteo = responseJSON
            show(meteo);
        })
}

function show(meteo) {
    // console.log(meteo);
    load.style.display = 'none';
    const { description, icon } = meteo.weather[0];
    const temp = meteo.main.temp;
    const html = `
    <div>
        <p class="temp">${weatherDeg(temp)}</p>
        <h2 class="city">📍 ${meteo.name}</h2> 
    </div>
    `
    section.innerHTML = html;
}

// show();


// Helpers functions

function capitalize(text) {
    return text.toUpperCase();
}

function weatherDeg(deg) {
    return `${Math.floor(deg)} °C`;
}

function formatText(text) {
    return text
        .split(' ')
        .map(mot => mot[0].toUpperCase() + mot.slice(1))
        .join(' ')
}

console.log()