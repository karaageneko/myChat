var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(5000, function(){
    console.log('Server Running.');
});

io.sockets.on('connection', function(socket){
    socket.on('c2smsg', function(msg){
        // メッセージが空だった場合の処理
        if (msg == '') {
          return;
        }

        //DB処理

        //サーバからクライアントへメッセージを返す
        socket.emit('s2cmsg', msg);
        socket.broadcast.emit('msg', msg);

        //メッセージログをコンソールに出力
        console.log('Say: ' + msg);
    });
});
