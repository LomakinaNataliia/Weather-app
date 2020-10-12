function formatDate(date) {
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
  return `${currentDay} ${currentDate}/${currentMonth}/${currentYear}, ${currentHour} : ${currentMinute}`;
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityName = document.querySelector("#city");
  cityName.innerHTML = cityInput.value;
}

function convertToFahrenheit() {
  let temperatureToday = document.querySelector("#temperature");
  temperatureToday.innerHTML = "77";
}

function convertToCelsius() {
  let temperatureToday = document.querySelector("#temperature");
  temperatureToday.innerHTML = "25";
}

//In your project, display the current date and time using JavaScript:
//Saturday 12/09/20, 18:45

let currentWeatherDate = document.querySelector("#current-weather-date");
let now = new Date();
currentWeatherDate.innerHTML = formatDate(now);

//Add a search engine, when searching for a city (i.e. Paris),
// display the city name on the page after the user submits the form.

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit.
//When clicking on it, it should convert the temperature to Fahrenheit.
//When clicking on Celsius, it should convert it back to Celsius.

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
