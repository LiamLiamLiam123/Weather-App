document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city').value.trim();
    if (city) {
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();

    if (response.ok) {
        updateUI(data);
    } else {
        alert(data.message || 'Something went wrong!');
    }
}

function updateUI(data) {
    document.getElementById('city-name').textContent = data.city;
    document.getElementById('temperature').textContent = `${data.temperature}°C`;
    document.getElementById('description').textContent = data.description;
    document.getElementById('weather-icon').src = data.icon;
}
