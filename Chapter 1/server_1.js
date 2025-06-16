// create a server using nodejs

// import http

const { prototype } = require('events');
const http = require('http');

const server = http.createServer((req,res)=>{
    //console.log(req.url);
    console.log(typeof req);
    if(req.url == '/product'){
        return res.end('This is product page');
    }else if(req.url == '/user'){
       return res.end('This is User page');
    }

     if(req.url == '/product1'){
        return res.end('This is product page1');
    }
        res.end('Welcome to node js');

// write will not end , end will end the process

});

server.listen(3100,()=>{
    console.log('Server is lisening');
});
