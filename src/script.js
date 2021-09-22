function updateDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDay = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDay];
  return `${day} ${hour}:${minutes}`;
}

//Display city name entered in form on page

function displayCity(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  searchCity(city);
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="forecast-day">${formatForecastDay(forecastDay.dt)}</div>
      <img
      src="https://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      />
      <div class="forecast-temperatures">
        <span class="forecast-temp-max">${Math.round(
          forecastDay.temp.max
        )}°</span>
        <span class="forecast-temp-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "eb4def79ec4de7a8430e27e8b5eefa1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
//Display current temperature of city entered in the form
function displayTemperature(response) {
  let showCityName = document.querySelector("#current-city");
  let showTemp = document.querySelector("#current-temp");
  let cityEntered = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector("#current-description");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = Math.round(response.data.main.temp);

  showCityName.innerHTML = `${cityEntered}`;
  showTemp.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "eb4def79ec4de7a8430e27e8b5eefa1f";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}q=${city}&units=imperial&appid=${apiKey}`)
    .then(displayTemperature);
}

function showPosition(position) {
  let apiKey = "eb4def79ec4de7a8430e27e8b5eefa1f";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let myLatitude = position.coords.latitude;
  let myLongitude = position.coords.longitude;
  axios
    .get(
      `${apiUrl}lat=${myLatitude}&lon=${myLongitude}&units=imperial&appid=${apiKey}`
    )
    .then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#coordinate-temp-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Fahrenheit to Celsius Converter

let currentTemp = document.querySelector("#current-temp");

let displayDate = document.querySelector("#current-time");
let currentTime = new Date();
displayDate.innerHTML = updateDate(currentTime);

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", displayCity);
