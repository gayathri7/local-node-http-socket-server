const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  //res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('--------A User Connected-----');
  socket.on('chat message', msg => {
    console.log("-------------chat message---------", msg)
    io.emit('chat message', msg);
  });
  socket.on('gayidata',(data) => {
    console.log('-----------gayi data event----', data);
    io.emit('gayidata', data)
  })
  socket.on('disconnect',() => {
    console.log('--------A User DisConnected-------')
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
