const express = require('express')
const http = require('http')
const io = require('socket.io')

const app = express();
const server = http.createServer(app)
const ioServer = io(server, {
  cors: {
    origin: '*',
    credentials: true,
  }
})

ioServer.on("connection", (socket) => {
  socket.on("sendMessage", (msg, nickname) => {
    console.log(nickname, msg)
    socket.to('room').emit('paintMessage', msg, nickname)
  })
  socket.on("enter", (nickname) => {
    console.log(`${nickname}님이 입장하셨습니다.`)
    socket.join("room")
    socket.to('room').emit('alertMessage', `${nickname}님이 입장하셨습니다.`)
  })
})

server.listen(4000, () => console.log('working'))