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
  socket.onAny((event, ...args) => {
    console.log('-----------onAny----', event, args);
    if(args[0] && args[0].val) {
      var type = args[0].type;
      var newVal = args[0].val;
      if(type === 'json') {
        try{
          newVal = JSON.parse(newVal)
        }catch(error) {
          console.error("-----------newValue----parse error- ", error);
          newVal = {data: newVal}
        }
      }
      io.emit(event, newVal)
    }
  })
  socket.on('disconnect',() => {
    console.log('--------A User DisConnected-------')
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
