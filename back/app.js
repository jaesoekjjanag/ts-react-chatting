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
  socket.on("sendMessage", (msg) => {
    console.log(msg)
    socket.to('room').emit('paintMessage', msg)
  })
  socket.on("enter", () => {
    socket.join("room")
    console.log('enterd')
  })
})

server.listen(4000, () => console.log('working'))