document.addEventListener('DOMContentLoaded', () => {
    let chatRooms = {
        0: {name: '이곳은 로비입니다. admin 이외에는 글을 작성할 수 없으며, 주로 공지사항이 올라옵니다.',
            messages: []},
        1: {name: '프렌치 디펜스 어드밴스드에 대한 방입니다.',
            messages: []},
        2: {name: '런던 시스템에 대한 방입니다.',
            messages: []},
        3: {name: '시실리안 나이도프에 대한 방입니다.',
            messages: []},
    };

    let chatroomsnum = 4

    let roomNum = '0'; // 채팅방
    let roomMessages = chatRooms[roomNum].messages;// 방의 메시지

    const users = {
        'admin': 'admin',
        'black': 'white',
        'clear': 'washing'
    };

    let currentUser = null; // 현재 로그인된 사용자 닉네임
    let file_signup = false; //회원가입 상태인지
    
    const Nickname = document.getElementById('nickname');
    const Password = document.getElementById('password');
    const loginForm = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const sendMessageBtn = document.getElementById('send-message-btn');
    const messageInput = document.getElementById('message');
    const messagesList = document.getElementById('messages');
    const chatRoomSelect = document.getElementById('chat-room-select');
    const roomNameDisplay = document.getElementById('room-name');
    const signupBtn = document.getElementById('signup-btn');
    const signupForm = document.getElementById('signup-form');
    const signupNicknme = document.getElementById('signup-nickname');
    const signupPassword = document.getElementById('signup-password');
    const signupConfirmPssword = document.getElementById('signup-confirm-password');

    // 초기 채팅방 메시지 로드
    loadMessages();

    // 방 이름 설정 함수
    function setRoomName(roomId) {
        roomNameDisplay.textContent = chatRooms[roomId].name;
    }

    // 하루가 지날 때마다 출력
    function Day() {
        const time = new Date(); // 현재 시간 객체
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const seconds = time.getSeconds();

        // 자정이 되었을 때만 실행
        if (hours === '00' && minutes === '00' && seconds === '00') {// 현재 시간을 밀리초로 저장
            const message = {
                nickname: 'clock',
                message: '새로운 하루가 밝았습니다.',
                timestamp: new Date().getTime()};
            chatRooms[roomNum].messages.push(message);// 현재 채팅방에 메시지 추가
            displayMessage(message);// 메시지를 화면에 출력
        }
    }

    // 채팅방 메시지 로드 함수
    function loadMessages() {
        roomMessages = chatRooms[roomNum].messages;
        messagesList.innerHTML = ''; // 메시지 리스트 초기화
        roomMessages.forEach(message => {displayMessage(message);});
    }

    // 메시지 출력 함수
    function displayMessage(message) {
        const li = document.createElement('li');
        const time = new Date(message.timestamp);
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;

        li.textContent = `[${formattedTime}] ${message.nickname}: ${message.message}`;

        
        if (message.nickname === 'clock') {
            const year = time.getFullYear();
            const month = (time.getMonth() + 1).toString().padStart(2, '0');
            const day = time.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            li.textContent = `[${formattedDate}] ${message.nickname}: ${message.message}`;
            li.style.color = '#f9f';}// 연홍색으로 표시
        if (message.nickname === 'admin') {li.style.color = '#0c3';}// 초록색으로 표시
        if (message.nickname === currentUser) {li.style.color = '#ed0';}// 노랑색으로 표시
        messagesList.appendChild(li);
    }

    // 로그인 버튼 클릭 이벤트
    loginBtn.addEventListener('click', () => {
        const nickname = Nickname.value.trim();
        const password = Password.value.trim();
        if (nickname === '' || password === '') {// 닉네임과 비밀번호 확인
            alert('닉네임과 비밀번호를 입력하세요.'); return;}
        if (users[nickname] !== password) {// 인증 실패
            alert('닉네임 혹은 비밀번호가 맞지 않습니다.'); return;}
        currentUser = nickname;// 현재 로그인된 사용자 설정
        Nickname.disabled = true;// UI 변경
        Password.disabled = true;
        loginForm.style.display = 'inline-block';
        signupForm.style.display = 'none';
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        signupBtn.style.display = 'none';
        sendMessageBtn.style.display = 'inline-block';
        messagesList.innerHTML = '';// 메시지 리스트 초기화, 메시지 로드
        loadMessages();
    });

    // 로그아웃 버튼 클릭 이벤트
    logoutBtn.addEventListener('click', () => {
        currentUser = null;// 현재 사용자 정보 초기화
        Nickname.disabled = false;// UI 변경
        Password.disabled = false;
        loginForm.style.display = 'inline-block';
        signupForm.style.display = 'none';
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        signupBtn.style.display = 'inline-block';
        sendMessageBtn.style.display = 'none';
        messagesList.innerHTML = '';// 메시지 리스트 초기화, 메시지 로드
        loadMessages();
    });

    
    // 회원가입 버튼 클릭 이벤트
    signupBtn.addEventListener('click', () => {
        if (!file_signup) {
        loginForm.style.display = 'none';// UI 변경
        signupForm.style.display = 'inline-block';
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        signupBtn.style.display = 'inline-block';
        sendMessageBtn.style.display = 'none';
        file_signup = true;}
        else {
        snickname = signupNicknme.value.trim();
        spassword = signupPassword.value.trim();
        scpassword = signupConfirmPssword.value.trim();
        if (snickname === '') {alert('닉네임을 입력하세요.'); return;}
        if (snickname in users) {alert("누군가 이 닉네임을 먼저 사용했습니다."); return;}
        if (spassword.length < 8) {alert('비밀번호는 8자리 이상이어야 합니다.'); return;}
        if (!/^[a-zA-Z0-9]+$/.test(spassword)) {alert('비밀번호에는 영문자와 숫자만이 사용 가능합니다.'); return;}
        if (spassword !== scpassword) {alert('비밀번호와 비밀번호 확인이 같지 않습니다.'); return;}
        users[snickname] = spassword;
        loginForm.style.display = 'inline-block';// UI 변경
        signupForm.style.display = 'none';
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        signupBtn.style.display = 'inline-block';
        sendMessageBtn.style.display = 'none';
        file_signup = false;
        }

    });

    // 전송 버튼 클릭 이벤트
    sendMessageBtn.addEventListener('click', () => {
        let messageText = messageInput.value;
        if (messageText.trim() === '') {// 메시지 입력 확인
            alert('메시지를 입력하세요.'); return;}
        if (roomNum === '0' && currentUser != 'admin') {// 메시지 제한
            alert('이 방에서 메시지를 남길 권한이 없습니다.'); return;}
        if (messageText.charAt(0) === '/' && currentUser === 'admin') {
            if (messageText === '/nick') {alert(JSON.stringify(users)); return;}
            if (messageText.startsWith('/makeroom') && currentUser === 'admin') {
                let roomName = messageText.substring(9).trim();//직접명령 제거 후 계산
                //let idx = messageText.indexOf("*");
                if (roomName === '') {alert('채팅방 이름을 입력하세요.'); return;}
                chatRooms[chatroomsnum] = {name: roomName,
                    messages: []};
                chatroomsnum += 1; 
                alert(`채팅방을 만들었습니다: ${roomName}`); return;}
            alert('유효하지 않은 명령어입니다.'); return;}
        if (messageText.charAt(0) === '*' && currentUser === 'admin') {
            messageText = messageText.substring(1);}

        const message = {// 메시지 객체 생성
            nickname: currentUser,// 현재 로그인된 사용자 닉네임
            message: messageText,
            timestamp: new Date().getTime()}; // 현재 시간을 밀리초로 저장
        chatRooms[roomNum].messages.push(message);// 현재 채팅방에 메시지 추가
        displayMessage(message);// 메시지를 화면에 출력
        messageInput.value = '';// 메시지 입력란 초기화
    });

    // 채팅방 변경 이벤트
    chatRoomSelect.addEventListener('change', () => {
        roomNum = chatRoomSelect.value; // 현재 채팅방 변경
        setRoomName(roomNum); // 방 이름 업데이트
        loadMessages(); // 메시지 로드
    });

    // 0.9초마다 실행되는 Day 함수 설정
    setInterval(Day, 900);
});