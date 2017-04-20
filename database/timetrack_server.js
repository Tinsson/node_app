var http = require("http");
var work = require("./lib/timetrack");
var mysql = require("mysql");
var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'timetrack'
});
var server = http.createServer(function(req,res){
    switch (req.method){
        case 'POST':
            switch(req.url){
                case '/':
                    work.add(db,req,res);
                    break; 
                case '/archive':
                    work.archive(db,req,res);
                    break;
                case '/delete':
                    work.delete(db,req,res);
                    break;
            }
            break;
        case 'GET':
            switch(req.url){
                case '/':
                    work.show(db,res);
                    break;
                case '/archived':
                    work.showArchived(db,res);
            }
            break;
    }
});
db.connect(function(err){
    if(err) throw err;
});
// var sql = "select * from myguests where id = " + db.escape(2);
// db.query("select * from myguests where id = ?",["2"],function(err,rows,fields){
//     if(err) throw err;
//     console.log(rows[0].firstname);
//     console.log(rows.length);
// })
var sql = 'CREATE TABLE IF NOT EXISTS work (';
    sql += 'id INT(10) NOT NULL AUTO_INCREMENT, ';
    sql += 'hours DECIMAL(5,2) DEFAULT 0, ';
    sql += 'date DATE, ';
    sql += 'archived INT(1) DEFAULT 0, ';
    sql += 'description LONGTEXT, ';
    sql += 'PRIMARY KEY(id))';
db.query(sql,function(err){
    if(err) throw err;
    console.log('Server started...');
    server.listen(3030);
})

