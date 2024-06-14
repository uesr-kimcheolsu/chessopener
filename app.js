/* app.js */
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// 정적 파일 제공 설정
app.use('/chessopener/js', express.static(path.join(__dirname, 'js')));
app.use('/chessopener', express.static(path.join(__dirname)));

// 기본 라우팅 설정
app.get('/chessopener', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('사용자가 연결되었습니다'); // 연결 확인용 로그

  socket.on('chatting', (data) => {
    console.log('메시지를 받았습니다:', data); // 메시지 수신 확인용 로그
    io.emit('chatting', data);
  });

  socket.on('disconnect', () => {
    console.log('사용자가 연결을 해제했습니다'); // 연결 해제 확인용 로그
  });
});

server.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중입니다');
});