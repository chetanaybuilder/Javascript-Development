// Live wheather app //

const cityinput = document.getElementById("cityinput");
const Btn = document.getElementById("btn");
const weatherinfo = document.getElementById("weatherinfo");

btn.addEventListener("click", searchwheather);

async function searchwheather() {
    const city = cityinput.value;

    try {
        // 1. Find the city's coordinates
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            weatherinfo.textContent = "City not found";
            return;
        }

        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;

        // 2. Get weather using coordinates
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

        const weatherData = await weatherResponse.json();

        // 3. Get weather values
        const temperature = weatherData.current.temperature_2m;
        const humidity = weatherData.current.relative_humidity_2m;
        const windSpeed = weatherData.current.wind_speed_10m;

        // 4. Display weather
        weatherinfo.innerHTML = `
            <h2>${city}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} km/h</p>
        `;

    } catch (error) {
        weatherinfo.textContent = "Something went wrong. Please try again.";
        console.log(error);
    }
}
   



    
      