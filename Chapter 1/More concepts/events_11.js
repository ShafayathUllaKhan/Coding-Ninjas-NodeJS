// Node.js has several built-in events, such as:

// data : triggered when a readable stream receives new data.

// error : fired when an error occurs in the application.

// listening : emitted when a server starts listening for incoming connections.

// data in chunks
// request flows like a stream in chunks
const http = require('http');

const server = http.createServer((req,res)=>{

    if(req.method == 'POST'){
        console.log(req.body); // undefined
        // expecting data from client
        let body = '';
        req.on('data',(chunk)=>{
            body += chunk.toString();
        })
        req.on('end', ()=>{
            console.log(body);
            res.end('Data is received');
        })
    }else{
        res.end('welcome to node js');
    }
    
});

server.listen(3100,()=>{
    console.log('server listining');
});

