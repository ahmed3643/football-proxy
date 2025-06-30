import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = '56a67b135fc848bf90b7f5e66a39f66a';

app.use(cors());

app.get('/matches', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(`https://api.football-data.org/v4/matches?status=SCHEDULED`, {
      headers: { 'X-Auth-Token': API_KEY }
    });

    if (!response.ok) throw new Error('API error');
    const data = await response.json();

    const matchesToday = data.matches.filter(match => match.utcDate.startsWith(today));
    res.json({ matches: matchesToday });
  } catch (err) {
    res.status(500).json({ error: 'فشل الاتصال بـ API', details: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('⚽ Proxy API is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
