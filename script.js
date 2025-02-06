document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const apiKey = "6fbde46912ab95284183c922dafd50d8";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim().toLowerCase();
    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      displayErrorMessage(error.message);
    }
  });

  // Fetch weather data for the selected city
  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}` ;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("City not found or API error");

      const data = await res.json();
      return data;      
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  }

  // Display weather data
  function displayWeatherData(data) {
    console.log(data);
    const {name, main, weather} = data;
    cityName.textContent = name;
    temperature.textContent = `Temperature : ${main.temp}f`;
    description.textContent = weather[0].description;
    
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");

  }

  // Display error message
  function displayErrorMessage(message) {
    errorMessage.textContent = message;
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
