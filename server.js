require ('dotenv').config();

const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.set('views', './views');
app.set('view engine', 'pug');


app.use((req, res, next) => {
  req.io = io;
  console.log('Hello, Im the middleware! :)');
  next();
})

let userCount = 0;

io.on('connection', socket => {
  socket.username = 'Anonymous';
  socket.color = 'black';
  userCount++;
  console.log('A user connected.');
  io.sockets.emit('new_connection', {
    username: socket.username,
    userCount: userCount,
  });
  io.sockets.emit('usercount', {  })

  socket.on('disconnect', () => {
    userCount--;
    io.sockets.emit('disconnect', {
      userCount: userCount,
      username: socket.username,
      })
  })

  socket.on('change_username', data => {
    io.sockets.emit('username_changed', { old: socket.username, new: data.username} )
    socket.username = data.username;
  })

  socket.on('new_message', data => {
    io.sockets.emit('new_message', {
      message: data.message,
      username: socket.username,
    })
  })

})

// Routes after middleware.
const router = require('./routes');
app.use('*', router);

const PORT = 1337;

server.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));
