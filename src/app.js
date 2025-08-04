document.addEventListener("DOMContentLoaded", () => {
  const darkbg = document.getElementById("light-dark");
  console.log(darkbg);
  darkbg.addEventListener("click", () => {
    let bg = document.querySelector(".env");
    console.log(bg);
    bg.classList.toggle("dark-mode");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const gradientBG = document.getElementById("gradient-bg");
  console.log(gradientBG);
  gradientBG.addEventListener("click", () => {
    let gradient = document.querySelector(".glass-bg");
    console.log(gradient);
    if (gradient.classList.contains("default-gradient")) {
      gradient.classList.remove("default-gradient");
      gradient.classList.add("gradient-1");
    } else {
      gradient.classList.remove("gradient-1");
      gradient.classList.add("default-gradient");
    }
  });
});

const todayBtn = document.getElementById("today-btn");
todayBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let content = document.querySelector("#content-displayed");
  let forecastSection = document.getElementById("forecast-section");
  content.style.display = "flex";
  forecastSection.style.display = "none";
});

function updateForecast(data) {
  let forecastSection = document.getElementById("forecast-section");
  let content = document.querySelector("#content-displayed");
  let forecastBlock = document.querySelectorAll(".forecast-first");
  let block = Array.from(forecastBlock);
  console.log(block);
  console.log(weekBtn);
  content.style.display = "none";
  forecastSection.style.display = "flex";

  let forecastDaily = data.daily;
  console.log(data.daily);
  block.forEach((element, i) => {
    let forecast = forecastDaily[i];
    console.log(forecast);
    let time = new Date(forecast.time * 1000);
    let formattedTime = moment(time).format("dddd");
    console.log(formattedTime);
    element.querySelector(".forecast-day").innerHTML = formattedTime;
    console.log(time);
    element.querySelector(".icon").src = forecast.condition.icon_url;
    element.querySelector(".description").innerHTML =
      forecast.condition.description;
    let max = Math.round(forecast.temperature.maximum);
    let min = Math.round(forecast.temperature.minimum);
    element.querySelector(".forecast-max").innerHTML = `${max}°`;

    element.querySelector(".forecast-min").innerHTML = `${min}°`;
  });
}

const weekBtn = document.querySelector("#week-btn");
console.log(weekBtn);

function forecastApi(city) {
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  console.log(forecastApiUrl);
  try {
    fetch(forecastApiUrl).then((response) => {
      let forecastResponse = response.json().then((data) => {
        weekBtn.addEventListener("click", (e) => {
          e.preventDefault();

          updateForecast(data);
          console.log("here's the:" + data);
        });
      });
    });
  } catch (error) {
    console.log("There's something wrong with the forecast API");
    console.log(error.message);
  }
}

function updateWeather(response) {
  let city = response.city;
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
  firstHeading.innerHTML = city;
  dateUpdated.innerHTML = `${formattedDate} `;
  weatherDetails.innerHTML = weatherCondition;
  humidity.innerHTML = ` ${humidityApi}%`;
  wind.innerHTML = ` ${windApi}km/h `;
  tempNow.innerHTML = `${currentTemp} <div class="current-temp-metric"></div>`;
  icon.innerHTML = `  <img class="current-temp-icon" src="${iconApi}">`;
  forecastApi(response.city);
}
let devMoode = false;
async function apiHandler(city) {
  if (devMoode) {
    console.log(`I need to work on the CSS, stop calls for ${city}`);
    return;
  }
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  try {
    let response = await fetch(apiUrl);
    let data = await response.json();
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
