var http = require("http");
var work = require("./lib/timetrack");
var mysql = require("mysql");
var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'mydb'
})
db.connect(function(err){
    if(err) throw err;
    console.log("connect as id " + db.threadId);
});
// var sql = "select * from myguests where id = " + db.escape(2);
db.query("select * from myguests where id = ?",["2"],function(err,rows,fields){
    if(err) throw err;
    console.log(rows[0].firstname);
    console.log(rows.length);
})
db.end();
