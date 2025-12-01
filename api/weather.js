// Vercel Serverless Function
// 환경변수에서 API 키를 가져와 날씨 API 호출

export default async function handler(req, res) {
    // CORS 설정
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { q } = req.query;
    const API_KEY = process.env.VITE_WEATHER_API_KEY;

    if (!API_KEY) {
        return res.status(500).json({ error: 'API 키가 설정되지 않았습니다.' });
    }

    if (!q) {
        return res.status(400).json({ error: '쿼리 파라미터 q가 필요합니다.' });
    }

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(q)}&lang=ko`
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || '날씨 정보를 가져올 수 없습니다.');
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('API 오류:', error);
        const statusCode = error.message.includes('API') ? 401 : 500;
        res.status(statusCode).json({ error: error.message || '서버 오류가 발생했습니다.' });
    }
}
