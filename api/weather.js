export default async function handler(req, res) {
    const location = req.query.location;
    const unitGroup = req.query.unitGroup || 'us';
    const apiKey = process.env.WEATHER_API_KEY;

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
}
