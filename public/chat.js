// 프론트엔드
const socket = io();

// 필요한 모든 element들을 불러들이기
const chat = document.querySelector("#chat");
const form = document.querySelector("form");
const name = form.name;
const message = form.message;
const send = form.send;

// submit (메세지 전송) 이벤트 리스너
form.addEventListener("submit", e => {
  e.preventDefault();

  // 메세지가 전송 중일 때는 비활성화 시킴.
  send.classList.remove("bg-purple-700");
  send.classList.add("cursor-not-allowed", "bg-purple-500");

  // sendMessage라는 이벤트를 emit
  socket.emit("sendMessage", {
    name: name.value,
    message: message.value
  });

  // message 창 초기화
  message.value = "";
  message.focus();
});

// 메세지 전송 시 새로운 element 형성하여 화면에 표시, 전송 버튼 재활성화
socket.on("showMessage", message => {
  const newMessage = document.createElement("div");
  const user = document.createElement("h3");
  const text = document.createElement("p");

  newMessage.classList.add("flex", "items-center", "mt-5");
  user.classList.add(
    "bg-blue-600",
    "p-3",
    "mr-10",
    "w-40",
    "rounded",
    "self-start"
  );
  user.innerHTML = message.name;
  text.classList.add("w-4/5");
  text.innerHTML = message.message;

  newMessage.appendChild(user);
  newMessage.appendChild(text);
  chat.appendChild(newMessage);

  // 메세지 수신 시 버튼 재활성화
  send.classList.remove("cursor-not-allowed", "bg-purple-500");
  send.classList.add("bg-purple-700");
});
