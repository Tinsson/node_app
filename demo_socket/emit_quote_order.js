var events = require("events");
var net = require("net");
var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on("join",function(id,client){
    var welcome = "welcome!\n"+ 'Guest online: '+ this.listeners('broadcast').length;
    client.write(welcome+"\n");
    this.clients[id] = client;
    this.subscriptions[id] = function(senderId,message){
        if(id != senderId){
            this.clients[id].write(message);
        }
    }
    this.on('broadcast',this.subscriptions[id]);
});
channel.on("leave",function(id){
    channel.removeListener('broadcast',this.subscriptions[id]);
    channel.emit('brodcast', id ,id+ ' has left the chat.\n');
})
//设置node监听器的数量不超过50个
channel.setMaxListeners(50);
var server = net.createServer(function(client){
    var id = client.remoteAddress+ ":" + client.remotePort;
    console.log(id);
    client.on("connect", function(){
        channel.emit('join',id,client);
    });
    client.on("data",function(data){
        data = data.toString();
        console.log(data);
        channel.emit('broadcast',id,data);
    });
    client.on("close",function(){
        channel.emit('leave',id);
    })
}).listen(8888);