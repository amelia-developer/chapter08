import axios from 'axios';

export default async function handler(req, res) {
  const { term } = req.query;

  try {
    console.log('Received request:', req.query); // 추가

    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term,
        entity: 'software',
        country: 'KR',
        lang: 'ko_kr'
      },
      headers: {
        'User-Agent': 'React-App'
      }
    });

    console.log('iTunes response:', response.data); // 추가

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message); // 기존 로그
    console.error('Full error:', error); // 추가 로그
    res.status(500).json({ error: 'Failed to fetch data from iTunes API' });
  }
}
