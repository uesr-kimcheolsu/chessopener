/*app.js*/

const express = require('express');
const path = require('path');
const app = express();

// 정적 파일 제공을 위한 경로 설정
app.use(express.static(path.join(__dirname, 'public')));

// 파비콘 요청 처리
app.get('/favicon.ico', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));});

// 기본 경로 '/' 에서 chatting_lobby.html 파일 제공
app.get('/', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'chatting_lobby.html'));});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);});