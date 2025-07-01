async function getWeather(location) {
    const apiKey = 'NNUE63CLCTQS7ATGQZWC9KEGF';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching weather data', error);
    }
}

getWeather('Los Angeles');