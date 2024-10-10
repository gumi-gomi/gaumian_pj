const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;  // 서버가 동작할 포트

// CORS 설정 (클라이언트에서 서버로 요청할 수 있도록 허용)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인 허용
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Google Maps API 호출 라우트
app.get('/api/maps', async (req, res) => {
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';  // API 키
  const location = req.query.location;  // 클라이언트로부터 받은 위치 데이터

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: location,
        key: apiKey
      }
    });
    
    res.json(response.data);  // API에서 받은 데이터를 클라이언트에 반환
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'API 요청 중 문제가 발생했습니다.' });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
