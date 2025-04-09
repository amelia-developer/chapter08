import axios from 'axios';

export default async function handler(req, res) {
  const { term } = req.query; // 검색어를 쿼리에서 가져옴

  try {
    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term,
        entity: 'software', // 앱만 검색되도록 설정
        country: 'KR',      // 한국 스토어 기준
        lang: 'ko_kr'       // 한국어
      },
      headers: {
        'User-Agent': 'React-App' // iTunes API에서 User-Agent 없을 때 차단하는 경우 방지
      }
    });

    res.status(200).json(response.data); // 받아온 데이터를 그대로 프론트에 전달
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from iTunes API' });
  }
}
