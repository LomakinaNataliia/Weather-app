function formatDate(timestamp) {
  let now = new Date(timestamp);

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
  
  let currentDate=now.getDate();
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
    "12", ];
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

function showWeather(response) {
  console.log(response);

  let dateElement=document.querySelector("#current-weather-date");
  dateElement.innerHTML=formatDate(response.data.dt * 1000);
 
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;

  let descriptionElement= document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  celsiusTemperature=response.data.main.temp;
  let temperatureToday = document.querySelector("#temperature");
  temperatureToday.innerHTML = Math.round(celsiusTemperature);

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let feelsLikeElement=document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);

  let humidityElement=document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement=document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let mainIconElement=document.querySelector("#main-icon");
  mainIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);  
  mainIconElement.setAttribute("alt", response.data.weather[0].description);
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
  search(city);
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

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempFahrenheit = celsiusTemperature * 1.8 + 32;
  let temperatureToday = document.querySelector("#temperature");
  temperatureToday.innerHTML=Math.round(tempFahrenheit);
  
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureToday = document.querySelector("#temperature");
  temperatureToday.innerHTML=Math.round(celsiusTemperature);
}

search("Kyiv");

//when a user searches for a city it should display the name of the city 
//on the result page and the current temperature of the city.
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCityName);

//use the Geolocation API to get GPS coordinates and display and the city and current temperature
let locationButton = document.querySelector("#search-by-location");
locationButton.addEventListener("click", searchCityLocation);

//When clicking on fahrenheit link, it should convert the temperature to Fahrenheit.
let celsiusTemperature=null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

//When clicking on Celsius link, it should convert it back to Celsius.
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);