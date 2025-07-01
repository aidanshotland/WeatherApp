async function getWeather(location) {
    const apiKey = 'NNUE63CLCTQS7ATGQZWC9KEGF';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${apiKey}`;
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

        //update page content
        document.getElementById('location').textContent = `Weather for ${locationName}`;
        document.getElementById('temperature').textContent = `Temperature: ${temperature}°F`;
        document.getElementById('conditions').textContent = `Conditions: ${conditions}`;
        document.getElementById('precipitation').textContent = `Chance of rain: ${precipChance}%`;


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