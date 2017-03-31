var http = require("http");
var fs =require("fs");

http.createServer(function(req,res){
    if(req.url == "/"){
        getTitles(res);
    }
}).listen(8000);

function getTitles(res){
    fs.readFile("./title.json",function(err,data){
        if(err){ return hadError(err,res);}
        var titles = JSON.parse(data.toString());
        getTmpl(titles,res);
    })
}
function getTmpl(titles,res){
    fs.readFile('./template.html',function(err,data){
        if(err) return hadError(err,res);
        var tmpl = data.toString();
        formatHtml(titles,tmpl,res);
    })
}
function formatHtml(titles,tmpl,res){
    var html = tmpl.replace("%",titles.join("</li><li>"));
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.end(html);
}
function hadError(err,res){
    console.error(err);
    res.end("Server Error");
}