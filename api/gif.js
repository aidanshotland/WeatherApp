export default async function handler(req, res) {
    const searchTerm = req.query.search;
    const apiKey = process.env.GIPHY_API_KEY;

    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${encodeURIComponent(searchTerm)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching GIF:', error);
        res.status(500).json({ error: 'Failed to fetch GIF' });
    }
}
