// Update day and time on page refresh

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

let displayDate = document.querySelector("#current-time");
let currentTime = new Date();
displayDate.innerHTML = updateDate(currentTime);

//Display city name entered in form on page

function displayCity(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  searchCity(city);
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", displayCity);

//Display current temperature of city entered in the form
function displayTemperature(response) {
  let showCityName = document.querySelector("#current-city");
  let showTemp = document.querySelector("#current-temp");
  let cityEntered = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  showCityName.innerHTML = `${cityEntered}`;
  showTemp.innerHTML = `${temperature}`;
}

function searchCity(city) {
  let apiKey = "eb4def79ec4de7a8430e27e8b5eefa1f";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}q=${city}&units=imperial&appid=${apiKey}`)
    .then(displayTemperature);
}

//Current Location Button - this is the bonus challenge
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

//let currentTemp = document.querySelector("#current-temp");

//function convertFahrenheit(event) {
//event.preventDefault();
//currentTemp.innerHTML = 66;
//}

//let degreeFahrenheit = document.querySelector("#fahrenheit-link");
//degreeFahrenheit.addEventListener("click", convertFahrenheit);

//function convertCelsius(event) {
//event.preventDefault();
//currentTemp.innerHTML = 19;
//}

//let degreeCelsius = document.querySelector("#celsius-link");
//degreeCelsius.addEventListener("click", convertCelsius)
