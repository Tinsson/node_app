//watch类的构造器，有监控的目录和放置修改过的文件目录
function Watcher(watchDir, processedDir){
    this.watchDir = watchDir;
    this.processedDir = processedDir;
}

var events = require("events"),
    util = require("util");
util.inherits(Watcher,events.EventEmitter);//继承了另一个对象里的行为

var fs = require('fs'),
    watchDir = './watch',
    processedDir = './done';
Watcher.prototype.watch = function(){
    var watcher = this;
    fs.readdir(this.watchDir, function(err,files){
        if(err) throw err;
        for(var i in files){
            watcher.emit('process',files[i]);
        }
    })
}

Watcher.prototype.start = function(){
    var watcher = this;
    fs.watchFile(watchDir,function(){
        watcher.watch();
    })
}

var watcher = new Watcher(watchDir, processedDir);

watcher.on('process', function process(file){
    var watchFile = this.watchDir+ "/" + file;
    var processedFile = this .processedDir + "/" +file.toLowerCase();
    fs.rename(watchFile, processedFile, function(err){
        if(err){ throw err;}
    })
})

watcher.start();

function async(callback){
    setTimeout(callback,200);
}
var color = "blue";
(function(color){
    async(function(){
        console.log('The color is '+color);
    })
})(color)

color = "green";