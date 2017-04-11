var fs = require('fs');
var completedTasks = 0;
var tasks = [];
var wordCounts = {};
var filesDir = './text';

function checkIfComplete(){
    completedTasks++;
    if(completedTasks == tasks.length){
        for(var index in wordCounts){
            console.log(index +': '+wordCounts[index]);
        }
    }
}

function countWordsInText(text){
    var words = text.toString().toLowerCase().split(/\W+/).sort();
    for(var i in words){
        var word = words[i];
        if(word){
            wordCounts[word] = (wordCounts[word] )? wordCounts[word] + 1 : 1;
        }
    }
}

fs.readdir(filesDir,function(err,files){
    if(err){throw err;}
    for(var i in files){
        var task = (function(file){
            return function(){
                fs.readFile(file,function(err,text){
                    if(err) {throw err;}
                    countWordsInText(text);
                    checkIfComplete();
                });
            }
        })(filesDir + '/' + files[i]);
        tasks.push(task);
    }
    for(var task in tasks){
        tasks[task]();
    }
})

//闭包的作用
var f1 = function(){
    var res = [];
    var fun = null;
    for(var i=1;i<10;i++){
        (function(i){
            fun = function(){console.log(i)};
            res.push(fun);
        })(i)
    }
    return res;
}
var res = f1();
for(var i=0;i<9;i++){
    res[i]();
}