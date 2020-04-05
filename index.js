var express = require('express');
var socket = require('socket.io');
const mongoose = require("mongoose")

// App setup
var app = express();
var server = app.listen(5001, function () {
  console.log('listening for requests on port 5001,');
});

/**
 * Set up of mongoDB
 */

mongoose.connect('mongodb://mongo:27017/docker-database', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connection is established!!")
  })
  .catch(() => {
    console.log("DB connection is failed")
  })

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

  console.log('made socket connection', socket.id);

  // Handle chat event
  socket.on('chat', function (data) {
    // console.log(data);
    io.sockets.emit('chat', data);
  });

  // Handle typing event
  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });

});