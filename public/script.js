let useCelsius = false;
let lastLocation = '';
let lastConditions = '';

async function getWeather(location) {
    const unitGroup = useCelsius ? 'metric' : 'us';
    const url = `/api/weather?location=${encodeURIComponent(location)}&unitGroup=${unitGroup}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const locationName = data.address;
        const today = data.days[0];
        const temperature = today.temp;
        const conditions = today.conditions;
        const precipChance = today.precipprob;

        document.getElementById('location').textContent = `Weather for ${locationName}`;
        document.getElementById('temperature').textContent = `Temperature: ${temperature}°${useCelsius ? 'C' : 'F'}`;
        document.getElementById('conditions').textContent = `Conditions: ${conditions}`;
        document.getElementById('precipitation').textContent = `Chance of rain: ${precipChance}%`;

        document.getElementById('weatherGif').classList.remove('hidden');
        document.getElementById('unitToggle').classList.remove('hidden');

        // Only fetch a new GIF if location changed
        if (location !== lastLocation) {
            getWeatherGif(conditions);
            lastLocation = location;
            lastConditions = conditions;
        }

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

document.getElementById('searchBtn').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;

    if (location.trim() !== "") {
        getWeather(location);
    } else {
        alert("Please enter a location");
    }
});

document.getElementById('unitToggle').addEventListener('click', () => {
    useCelsius = !useCelsius;

    const btn = document.getElementById('unitToggle');
    btn.textContent = useCelsius ? 'Show in Fahrenheit' : 'Show in Celsius';

    const location = document.getElementById('locationInput').value || lastLocation;
    if (location.trim() !== "") {
        getWeather(location);
    }
});

async function getWeatherGif(searchTerm) {
    const url = `/api/gif?search=${encodeURIComponent(searchTerm)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const gifUrl = data.data.images.original.url;
        document.getElementById('weatherGif').src = gifUrl;
    } catch (error) {
        console.error('Error fetching GIF:', error);
    }
}
