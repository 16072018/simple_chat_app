// 서버와 socket.io 간의 상호작용
const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app); // io requires raw http
const io = socketio(server); // Setup socket.io's server

// 서버 접속 시 사용할 파일들
const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));

io.on("connection", socket => {
  socket.broadcast.emit("ShowMessage", {
    name: "Anonymous",
    message: "A new user has joined"
  });
  socket.on("sendMessage", message => io.emit("showMessage", message));
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log("Server is running..."));
