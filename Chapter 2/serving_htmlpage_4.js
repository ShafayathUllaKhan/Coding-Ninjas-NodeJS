// serving html page by express

const express = require('express');

// server

const server = express();

server.get('/',(req,res)=>{
    return res.send('welcome to express');
    
});

// my static files are in public folder which can be accessed directly
server.use(express.static('public'));

server.listen(3400,()=>{
    console.log('server is listening');
})