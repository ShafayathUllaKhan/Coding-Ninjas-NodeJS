// 1. import express
import "./env.js"
import express, { urlencoded } from "express";
import apiDocs from './swagger.json' with {type: 'json'};
import swagger, { serve } from 'swagger-ui-express';
import cors from 'cors';
import userRouter from "./src/features/user/user.routes.js";
import { basicAuthorizer } from "./src/middleware/basicAuth.middleware.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import cartRouter from "./src/features/cart/cartItems.routes.js";
import productRouter from "./src/features/product/product.routes.js";
import loggerMiddleware, { logger } from "./src/middleware/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import {connectToMongoDB} from "./src/config/mongodb.js";
import orderRouter from "./src/features/order/order.routes.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import mongoose from "mongoose";
import likeRouter from "./src/features/like/like.router.js";


// 2. Create server
const server = express();


// CORS policy configuration
var corsOptions = {
    origin:'http://localhost:3200' // client port number shoulde be there
}

// cors library
server.use(cors(corsOptions));


// cors traditional code
// server.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','*');//http://localhost:3200
//     res.header('Access-Control-Allow-Headers', '*');// 'Content-Type, Authorization'
//     res.header('Access-Control-Allow-Methods', '*');
//     // return ok for preflight request.
//     if(req.method == "OPTIONS"){
//         return res.sendStatus(200);
//     }
//     next();
// })

server.use(express.json());

// for all requests related to product, redirect to product routes.
// localhost:3200/api/products

server.use("/api-docs", 
swagger.serve, 
swagger.setup(apiDocs));

server.use(loggerMiddleware);

server.use('/api/products',jwtAuth,productRouter);
server.use('/api/cartItems',jwtAuth,cartRouter);
server.use('/api/orders',jwtAuth,orderRouter);
server.use('/api/users',userRouter);
server.use('/api/likes',jwtAuth,likeRouter)
server.use(express.static('public'));

// server.use(urlencoded({extended:true}))

// 3. Default request handler

server.get('/',(req,res)=>{
    res.send('Welcome to Ecommerce APIs');
});


// 4. Middleware to handle 404 requests.
server.use((req,res)=>{
    res.status(404).send("API not found.")
})

// Error handler middleware
server.use((err, req,res,next)=>{

     if(err instanceof mongoose.Error.ValidationError){
       return res.status(400).send(err.message);
    }

    if(err instanceof ApplicationError){
       return  res.status(err.code).send(err.message);
    }
    // server errors
    let error = 'Server error ' + err;
    logger.info(error);
    return res.status(500).send("Something went wrong, please try later")
})


// 5. Specify port
server.listen(3202,()=>{
    console.log('server is listining to 3202');
    //connectToMongoDB();
    connectUsingMongoose();
})