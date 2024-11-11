const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Replace with your OpenWeatherMap API key
const apiKey = 'de99d1c868e7af0e23fbbdf01292bdc8';

app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API route to fetch weather data
app.get('/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).send({ message: 'City is required' });
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric', // Celsius temperature
                lang: 'en',
            }
        });

        const weatherData = response.data;
        const weather = {
            city: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
        };

        res.send(weather);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
