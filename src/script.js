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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

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
  let celciusLink = document.querySelector("#celcius-link");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  let searchedCity = `${searchCity.value}`;
  let key = "cd070e95ac9ddf93deb2685de9391443";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${key}&units=${units}`;

  axios.get(url).then(displayWeather);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2">
         <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
           <img src= "http://openweathermap.org/img/wn/${
             forecastDay.weather[0].icon
           }@2x.png" class= "forecast-image" width="70"/>
           <div class="forecast-temperature">
              <span class="forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}º </span>  
              <span class="forecast-temperature-min"> ${Math.round(
                forecastDay.temp.min
              )}º </span>
            </div>
        </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let key = "cd070e95ac9ddf93deb2685de9391443";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=${units}`;
  let fahrenheit = document.querySelector("#fahrenheit-link");
  fahrenheit.addEventListener("click", changeFahrenheit);
  function changeFahrenheit(event) {
    event.preventDefault();
    let key = "cd070e95ac9ddf93deb2685de9391443";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=${units}`;
    axios.get(apiUrl).then(displayForecast);
  }
  function changeCelcius(event) {
    event.preventDefault();
    let key = "cd070e95ac9ddf93deb2685de9391443";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=${units}`;
    axios.get(apiUrl).then(displayForecast);
  }

  let celcius = document.querySelector("#celcius-link");
  celcius.addEventListener("click", changeCelcius);
  axios.get(apiUrl).then(displayForecast);
}
function displayWeather(response) {
  let weatherDiv = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  let typedCity = document.querySelector("#typed-city");
  let cityCountry = response.data.sys.country;
  let returnedCity = response.data.name;
  let description = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;
  typedCity.innerHTML = `${returnedCity}, ${cityCountry}`;
  description.innerHTML = `${response.data.weather[0].main}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  let wind = document.querySelector("#wind");
  let currentWindSpeed = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  let currentHumidity = Math.round(response.data.main.humidity);
  let dateElement = document.querySelector("#time");

  weatherDiv.innerHTML = `${temperature}ºC`;
  humidity.innerHTML = ` Humidity ${currentHumidity}%`;
  wind.innerHTML = `Wind ${currentWindSpeed} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  function changeFahrenheit(event) {
    event.preventDefault();
    let FTemperature = document.querySelector("#temperature");
    let celciusLink = document.querySelector("#celcius-link");
    let fahrenheitLink = document.querySelector("#fahrenheit-link");
    let celcius = Math.round(response.data.main.temp);
    let fahrenheit = Math.round(([celcius] * 9) / 5 + 32);
    celciusLink.classList.remove("active");
    celciusLink.classList.add("inactive");
    fahrenheitLink.classList.add("active");
    FTemperature.innerHTML = `${fahrenheit}ºF`;
  }

  function changeCelcius(event) {
    event.preventDefault();
    let CTemperature = document.querySelector("#temperature");
    let celciusLink = document.querySelector("#celcius-link");
    let fahrenheitLink = document.querySelector("#fahrenheit-link");
    let celcius = Math.round(response.data.main.temp);
    fahrenheitLink.classList.remove("active");
    celciusLink.classList.add("active");
    CTemperature.innerHTML = `${celcius}ºC`;
  }
  let fahrenheit = document.querySelector("#fahrenheit-link");
  fahrenheit.addEventListener("click", changeFahrenheit);

  let celcius = document.querySelector("#celcius-link");
  celcius.addEventListener("click", changeCelcius);

  getForecast(response.data.coord);
}

function displayCurrentTemperature(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-city");
  searchedCity.value = " ";

  function handlePosition(position) {
    let key = "cd070e95ac9ddf93deb2685de9391443";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "metric";
    let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${units}`;
    let celciusLink = document.querySelector("#celcius-link");
    let fahrenheitLink = document.querySelector("#fahrenheit-link");
    fahrenheitLink.classList.remove("active");
    celciusLink.classList.add("active");
    axios.get(locationUrl).then(displayWeather);
  }

  navigator.geolocation.getCurrentPosition(handlePosition);
}

let form = document.querySelector("#form");
form.addEventListener("submit", changeCity);

let current = document.querySelector("#current-button");
current.addEventListener("click", displayCurrentTemperature);

Search("New York");
displayForecast();
