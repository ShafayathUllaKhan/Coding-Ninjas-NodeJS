// http headers 
// and its features

// provide metadata about the request or response, such as the content type or length.

// set cookies to store user-specific data.
// control caching behaviour
// communicate server-specific information to the client

//popular http headers

// content-type 
// authorization 
// accept-language 
// user-agent



const express = require('express');
const server = express();

function globalMiddleware(req,res,next){ 
    console.log('global middleware');
    next();
}


server.use(globalMiddleware);


server.get('/', (req,res)=>{
    res.set('Content-Type', 'text/plian'); // http header how to send from server to client
    res.send('Welcome to express server');
});

server.post('/',(req,res)=>{
     res.status(201).send('post request'); // status code added
})


server.put('/',(req,res)=>{
     res.send('put request');
})


server.delete('/',(req,res)=>{
     res.send('put request');
})

server.listen(3300,()=>{
    console.log('server is listing');
});


