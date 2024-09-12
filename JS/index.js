document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '0c107f32d77c47f4bf9112959240909';
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const weatherInfo = document.getElementById('weather-info');

    function fetchWeather(location) {
        const weatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;

        fetch(weatherUrl)
            .then(response => response.json())
            .then(data => {
                if (!data || !data.forecast || !data.forecast.forecastday) {
                    weatherInfo.innerHTML = `<p>City not found, please try again.</p>`;
                    return;
                }

                let weatherCards = '';
                for (let i = 0; i < data.forecast.forecastday.length; i++) {
                    const day = data.forecast.forecastday[i];
                    const date = new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                    const weatherIcon = `https:${day.day.condition.icon}`;
                    weatherCards += `
                        <div class="weather-card">
                            <h3>${date}</h3>
                            <img src="${weatherIcon}" alt="${day.day.condition.text}">
                            <p>Max Temp: ${day.day.maxtemp_c} °C</p>
                            <p>Min Temp: ${day.day.mintemp_c} °C</p>
                            <p>Condition: ${day.day.condition.text}</p>
                            <p>Humidity: ${day.day.avghumidity}%</p>
                            <p>Wind Speed: ${day.day.maxwind_kph} kph</p>
                        </div>
                    `;
                }
                weatherInfo.innerHTML = weatherCards;
            })
            .catch(error => {
                console.error('Error fetching the weather data:', error);
                weatherInfo.innerHTML = `<p>An error occurred, please try again.</p>`;
            });
    }

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const location = searchInput.value.trim();
        if (location) {
            fetchWeather(location);
        }
    });

    fetchWeather('Landan');
});
