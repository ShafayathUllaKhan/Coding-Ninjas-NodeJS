
const express = require('express');
const server = express();

function globalMiddleware(req,res,next){ 
    console.log('global middleware');
    next();
}


server.use(globalMiddleware);


server.get('/', (req,res)=>{
    res.send('Welcome to express server');
});

server.post('/',(req,res)=>{
     res.send('post request');
})


server.put('/',(req,res)=>{
     res.send('put request');
})


server.delete('/',(req,res)=>{
     res.send('put request');
})

server.listen(3200,()=>{
    console.log('server is listing');
});


