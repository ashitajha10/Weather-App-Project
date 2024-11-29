const apiKey = `06f0b8c91abc38e081cb4c5b4b69a0a2`;

async function fetchWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric
            appid=${apiKey}`
        );

        if(!response.ok) {
            throw new Error ("Unable to fetch weather data");
        }
        const data = await response.json();
        console.log(data);
        // console.log(data.main.temp);
        // console.log(data.name);
        // console.log(data.wind.speed);
        // console.log(data.main.humdity);
        // console.log(data.visibility);
        updateWeatherUI(data);
    } catch(error){
    console.error(err0r);
    }

}    

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");

const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description i")



function updateWeatherUI(data) {

    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)} km/h`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility/1000} km`;
    descriptionText.textContent = data.weather[0].description;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.textContent = `<i class="fa-solid fa-wind">${weatherIconName}</i>`;

}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("submit", function (e){
    e.preventDefault();

    const city = inputElement.value;
    if(city!==''){
        fetchWeatherData(city);
        inputElement.value = "";
    }
});

