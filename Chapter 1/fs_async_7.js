const fs = require('fs');

fs.readFile('data.txt',(err,data)=>{
    if(err){
        console.log(err + "Custom error");
    }else{
        console.log(data.toString());
    }
})

fs.writeFile('data.txt','sample data',(err)=>{
    if(err){
        console.log(err + "Custom error");
    }else{
        console.log('file written');
    }
})

fs.appendFile('data.txt','\nmore data',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('File is updated');
    }
})

fs.unlink('data.txt',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('File is deleted');
    }
})