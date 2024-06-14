/* chat.js */
const socket = io(); // 서버와의 소켓 연결 설정
const nickname = document.querySelector('#nickname');
const chatList = document.querySelector('.chatting-list');
const chatInput = document.querySelector('.chatting-input');
const sendButton = document.querySelector('.send-button');

// 전송 버튼 클릭 이벤트 리스너
sendButton.addEventListener('click', () => {
  const param = {
    name: nickname.value,
    msg: chatInput.value,
  };
  console.log('메시지를 보냈습니다:', param); // 메시지 전송 확인용 로그
  socket.emit('chatting', param);
  chatInput.value = ''; // 메시지를 보낸 후 입력 필드 비우기
});

// 서버로부터 'chatting' 이벤트를 받으면, 메시지를 채팅 목록에 추가
socket.on('chatting', (data) => {
  console.log('서버로부터 메시지를 받았습니다:', data); // 메시지 수신 확인용 로그
  const li = document.createElement('li');
  li.innerText = `${data.name} : ${data.msg}`;
  chatList.appendChild(li);
});