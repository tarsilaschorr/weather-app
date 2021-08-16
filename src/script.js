let currentDate = document.querySelector("#date");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
currentDate.innerHTML = `${day}, ${month} ${date}`;

// getting name of city

function Search(city) {
  let key = "cd070e95ac9ddf93deb2685de9391443";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;

  axios.get(url).then(displayWeather);
}
function changeCity(event) {
  event.preventDefault();
  let typedCity = document.querySelector("#typed-city");
  let searchCity = document.querySelector("#search-city");

  let searchedCity = `${searchCity.value}`;
  let key = "cd070e95ac9ddf93deb2685de9391443";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${key}&units=${units}`;

  axios.get(url).then(displayWeather);
}
let form = document.querySelector("#form");
form.addEventListener("submit", changeCity);

// getting city temperature
function displayWeather(response) {
  let weatherDiv = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  let typedCity = document.querySelector("#typed-city");
  let cityCountry = response.data.sys.country;
  let returnedCity = response.data.name;
  let description = document.querySelector("#description");

  typedCity.innerHTML = `${returnedCity}, ${cityCountry}`;
  description.innerHTML = `${response.data.weather[0].main}`;
  // getting time zone
  function HandleTimeZone(response) {
    console.log(response.data);
  }
  let loc = "35.731252, 139.730291"; // Tokyo expressed as lat,lng tuple
  let targetDate = new Date();
  let timestamp =
    targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60; // Current UTC date/time expressed as seconds since midnight, January 1, 1970 UTC
  let apikey = "AIzaSyBTh9gmaNnMC9sBN8yYqHWyGzSPsaw7pBY";
  let apicall = `https://maps.googleapis.com/maps/api/timezone/json?location=${loc}&×tamp=${timestamp}&key=${apikey}`;
  axios.get(apicall).then(HandleTimeZone);

  let wind = document.querySelector("#wind");
  let currentWindSpeed = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  let currentHumidity = Math.round(response.data.main.humidity);

  weatherDiv.innerHTML = `${temperature}ºC`;
  humidity.innerHTML = ` Humidity ${currentHumidity}%`;
  wind.innerHTML = `Wind ${currentWindSpeed} km/h`;

  function changeFahrenheit(event) {
    event.preventDefault();
    let FTemperature = document.querySelector("#temperature");
    let celcius = Math.round(response.data.main.temp);
    let fahrenheit = Math.round(([celcius] * 9) / 5 + 32);
    FTemperature.innerHTML = `${fahrenheit}ºF`;
  }

  function changeCelcius(event) {
    event.preventDefault();
    let CTemperature = document.querySelector("#temperature");
    let celcius = Math.round(response.data.main.temp);
    CTemperature.innerHTML = `${celcius}ºC`;
  }
  let fahrenheit = document.querySelector("#fahrenheit-link");
  fahrenheit.addEventListener("click", changeFahrenheit);

  let celcius = document.querySelector("#celcius-link");
  celcius.addEventListener("click", changeCelcius);
}
// current location
function displayTemperature(response) {
  let typedCity = document.querySelector("#typed-city");
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let weatherDiv = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let currentHumidity = Math.round(response.data.main.humidity);
  let wind = document.querySelector("#wind");
  let currentWindSpeed = Math.round(response.data.wind.speed);
  typedCity.innerHTML = `${city}, ${response.data.sys.country}`;
  weatherDiv.innerHTML = `${temperature}ºC`;
  humidity.innerHTML = ` Humidity ${currentHumidity}%`;
  wind.innerHTML = `Wind ${currentWindSpeed} km/h`;
}
function displayCurrentTemperature(event) {
  event.preventDefault();
  function handlePosition(position) {
    let key = "cd070e95ac9ddf93deb2685de9391443";
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "metric";
    let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${units}`;
    axios.get(locationUrl).then(displayTemperature);
  }

  navigator.geolocation.getCurrentPosition(handlePosition);
}
let current = document.querySelector("#current-button");
current.addEventListener("click", displayCurrentTemperature);

Search("New York");
