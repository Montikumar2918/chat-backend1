const express = require("express");
const app = express();
require('dotenv').config()
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", (data) => {
    console.log("User Disconnected", socket.id);
  });
});

app.use('/', function(req, res, next) {
  res.send("server is running");
 
});



 const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`SERVER RUNNING on Port ${PORT}`);
});
