var net = require("net");

var server = net.createServer(function(socket){
    socket.once('data',function(date){
        socket.write(data);
    })
}).listen(8080);