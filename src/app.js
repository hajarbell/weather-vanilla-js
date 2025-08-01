function updateWeather(response) {
  let city = document.getElementById("user-city-input");
  let time = response.time;
  let date = new Date(time * 1000);
  let formattedDate = moment(date).format("dddd LT");
  let weatherCondition = response.condition.description;
  let humidityApi = response.temperature.humidity;
  let windApi = response.wind.speed;
  let currentTemp = Math.round(response.temperature.current);
  let iconApi = response.condition.icon_url;
  console.log(iconApi);
  console.log(weatherCondition);

  console.log(formattedDate);
  console.log(date);
  let firstHeading = document.querySelector("h1");
  let dateUpdated = document.querySelector("#date");
  let weatherDetails = document.querySelector("#weather-info");
  let humidity = document.querySelector("#humdity-info");
  let wind = document.querySelector("#wind-info");
  let tempNow = document.querySelector("#current-temp-digit");
  let icon = document.querySelector("#current-temp-icon");

  console.log(weatherDetails);
  firstHeading.innerHTML = response.city;
  dateUpdated.innerHTML = `${formattedDate} – `;
  weatherDetails.innerHTML = weatherCondition;
  humidity.innerHTML = `Humidity: <strong>${humidityApi}%</strong> | `;
  wind.innerHTML = ` ${windApi}km/h `;
  tempNow.innerHTML = `${currentTemp} <div class="current-temp-metric"></div>`;
  icon.innerHTML = `  <img class="current-temp-icon" src="${iconApi}">`;
}

async function apiHandler(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    updateWeather(data);
  } catch (error) {
    console.log("An Error in the API has been caught");
    console.log(error.message);
  }
}

function getCity(event) {
  event.preventDefault();
  const userInput = document.querySelector("#user-city-input");
  const cityName = userInput.value;
  apiHandler(cityName);
  console.log(cityName);
}
document.addEventListener("DOMContentLoaded", () => {
  const formElement = document.getElementById("form");
  formElement.addEventListener("submit", getCity);
  apiHandler("Tokyo");
});
