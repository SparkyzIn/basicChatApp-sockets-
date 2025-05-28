const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./public/index.html"));
});

io.on("connection", (socket) => {
  socket.on("chat message", (data) => {
    // Do NOT wrap `data.message` again
    io.emit("chat message", data); // data = { message, senderId }
  });
});

server.listen(3000, () => console.log("Server is running on port 3000"));
