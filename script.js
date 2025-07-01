let useCelsius = false;

async function getWeather(location) {
    const apiKey = 'NNUE63CLCTQS7ATGQZWC9KEGF';
    const unitGroup = useCelsius ? 'metric' : 'us';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        //extract important data
        const locationName = data.address;
        const today = data.days[0];
        const temperature = today.temp;
        const conditions = today.conditions;
        const precipChance = today.precipprob;

        const unit = useCelsius ? '°C' : '°F';
        document.getElementById('temperature').textContent = `Temperature: ${temperature}${unit}`;


        //update page content
        document.getElementById('location').textContent = `Weather for ${locationName}`;
        document.getElementById('conditions').textContent = `Conditions: ${conditions}`;
        document.getElementById('precipitation').textContent = `Chance of rain: ${precipChance}%`;

        getWeatherGif(locationName);


    } catch (error) {
        console.error('Error fetching weather data', error);
    }


}


document.getElementById('searchBtn').addEventListener('click', ()=> {
    const location = document.getElementById('locationInput').value;

    if(location.trim() !==""){
        getWeather(location)
    } else {
        alert("Please enter a location")
    }
});


document.getElementById('unitToggle').addEventListener('click', ()=> {
    useCelsius = !useCelsius;

    const btn = document.getElementById('unitToggle');
    btn.textContent = useCelsius ? 'Show in Fahrenheit' : 'Show in Celsius';
    const location = document.getElementById('locationInput').value || 'Los Angeles';
    getWeather(location);

})

async function getWeatherGif(searchTerm) {
    const apiKey = '37Cr1UDDTOTzhAiJKOWPmQcocT7vqwSZ'
    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${encodeURIComponent(searchTerm)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const gifUrl = data.data.images.original.url;
        document.getElementById('weatherGif').src = gifUrl
    } catch (error) {
        console.log('Error fetching GIF:', error);
    }
}
