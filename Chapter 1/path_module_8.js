// why patch 

// src/home this file location in mac
// but in windows the syntax is diiferent so the path module is used.

const fs = require('fs');
const path = require('path');

const filepath = path.join('src','home','data1.txt');
const filepathresolve = path.resolve('src','home','data1.txt');
console.log(filepath);// src\home\data1.txt --> windows
console.log(filepath);// src/home/data1.txt --> mac
console.log(filepathresolve);

// with join
fs.readFile(filepath,(err,data)=>{
    if(err){
        console.log(err + "Custom error");
    }else{
        console.log(data.toString());
    }
})

// with resolve
fs.readFile(filepathresolve,(err,data)=>{
    if(err){
        console.log(err + "Custom error");
    }else{
        console.log(data.toString());
    }
})
// gives you extension

console.log(path.extname(filepath));
