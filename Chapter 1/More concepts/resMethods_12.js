
const http = require('http');

const server = http.createServer((req,res)=>{

    res.write('This is coming from nodejs server');
    console.log(req.url);
    if(req.url == '/first'){
      return  res.end('This is first response');// after end no end and write you will get error write after end
    }else{
         res.end("Hello from nodejs");
    }
   
});

server.listen(3100,()=>{
    console.log('server listining');
});

