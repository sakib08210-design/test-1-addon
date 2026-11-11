const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

const AUTH_TOKEN = "

const manifestData = {
  id: "custom.music.addon",
  name: "Amazon Music Addon",
  version: "1.0.0",
  description: "Amazon Music streaming addon",
  author: "Sakib",
  type: "audio-provider"
};

app.get('/', (req, res) => {
  res.json(manifestData);
});

app.get('/manifest.json', (req, res) => {
  res.json(manifestData);
});

app.get('/search', async (req, res) => {
  const query = req.query.q || req.query.query;
  const searchQuery = query ? query : "Arijit";

  try {
    const targetUrl = `https://amz.dezalty.com/search?q=${encodeURIComponent(searchQuery)}`;
    
    const response = await fetch(targetUrl, {
      headers: {
        "Authorization": `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });
    
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Failed to fetch" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
