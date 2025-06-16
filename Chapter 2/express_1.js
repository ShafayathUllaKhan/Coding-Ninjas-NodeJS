// express js node js framework to build web application easily

//express solves for us
// routing
// middleware
// template engine

// advantages of express
// easy to learn
// high performance
// template engine

// creating server by using express 

const express = require('express');

// create server

const server = express();

function globalMiddleware(req,res,next){ // application meddleware
    console.log('global middleware');
    next();// if you dont give next the process will not move forward if function in use method so any route the use function will be called so next should be there
}

// this is going to be executed for all requests
server.use(globalMiddleware);

// route level middlewares going to be executed for send requests.
// listen for defual request
server.get('/send', // this route level middleware
    // 1st middleware
    (req,res,next)=>{
        console.log('First middleware hit'); // what happens you know the page will be loading it will not move to the next request so move to next request you can use next and oder of middle ware matters 
        next();
},
// 2st middleware
(req,res)=>{
    res.send('Welcome to express server');// send is the wrapper function it calls res.end only but with more features and properties like req.header where as req.end you need to add explicitly

    // note --> first middleware sending response and then next function is excuted and then second middleware is also sending response then you will get error cannot set headers after they are sent to the client
});

// listen on specified port
server.listen(3100,()=>{
    console.log('server is listing');
});

// you can also put in array all the middleware
