const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//Serve static files from the 'frontend' folder
app.use(express.static(path.join(__dirname, '..', 'frontend')));

//Updated path to the 'index.html' file located in the 'frontend' folder
app.get('/', (req, res) => {
  //Navigate up one level from 'backend' and then to 'frontend/index.html'
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  //Listen for chat messages from the client
  socket.on('chat message', (msg) => {
    //Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
