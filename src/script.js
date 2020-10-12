function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];

  let currentDate = now.getDate();

  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let currentMonth = months[now.getMonth()];

  let currentYear = now.getUTCFullYear();

  let currentHour = now.getHours();

  let currentMinute = now.getMinutes();
  // if (currentMinute < 10) currentMinute = `0${currentMinute}`;
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  return `${currentDay} ${currentDate}/${currentMonth}/${currentYear}, ${currentHour}:${currentMinute}`;
}

function calculateSunrise(sunriseTime) {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  let sunrise = new Date(sunriseTime * 1000);
  // Hours part from the timestamp
  let hoursSunrise = sunrise.getHours();
  // Minutes part from the timestamp
  let minutesSunrise = "0" + sunrise.getMinutes();
  // Will display time in 10:30 format
  document.querySelector("#sunrise").innerHTML =
    hoursSunrise + ":" + minutesSunrise.substr(-2);
}

function calculateSunset(sunsetTime) {
  let sunset = new Date(sunsetTime * 1000);
  let hoursSunset = sunset.getHours();
  let minutesSunset = "0" + sunset.getMinutes();
  document.querySelector("#sunset").innerHTML =
    hoursSunset + ":" + minutesSunset.substr(-2);
}

function showWeather(response) {
  console.log(response);
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;

  let temperatureToday = document.querySelector("#temperature");
  let temp = Math.round(response.data.main.temp);
  temperatureToday.innerHTML = temp;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  let sunriseTime = response.data.sys.sunrise;
  calculateSunrise(sunriseTime);
  let sunsetTime = response.data.sys.sunset;
  calculateSunset(sunsetTime);

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function search(city) {
  let apiKey = `df6d0c618d1d938dbbaf07dbd577f2e4`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function searchCityName(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiKey = `df6d0c618d1d938dbbaf07dbd577f2e4`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  // or let city = document.querySelector("#city-input").value;
  search(city);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `df6d0c618d1d938dbbaf07dbd577f2e4`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function searchCityLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentWeatherDate = document.querySelector("#current-weather-date");
let now = new Date();
currentWeatherDate.innerHTML = formatDate(now);

//On your project, when a user searches for a city (example: New York),
//it should display the name of the city on the result page and the current
//temperature of the city.

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCityName);

search("Kyiv");
//Add a Current Location button.When clicking on it, it uses the Geolocation API to get your
//GPS coordinates and display and the city and current temperature using the OpenWeather API.

let locationButton = document.querySelector("#search-by-location");
locationButton.addEventListener("click", searchCityLocation);

//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit.
//When clicking on it, it should convert the temperature to Fahrenheit.
//When clicking on Celsius, it should convert it back to Celsius.

// function convertToFahrenheit() {
//   let convertTemperatureToday = document.querySelector("#temperature");
//   let tempFahrenheit = Math.round(convertTemperatureToday * 1.8 + 32);
//   convertTemperatureToday.innerHTML = tempFahrenheit;
// }

// function convertToCelsius() {
//   let convertTemperatureToday = document.querySelector("#temperature");
//   let tempCelsius = Math.round(((convertTemperatureToday.value - 32) * 5) / 9);
//   convertTemperatureToday.innerHTML = tempCelsius;
// }

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", convertToFahrenheit);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", convertToCelsius);
