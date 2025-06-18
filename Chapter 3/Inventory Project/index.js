import  express, { urlencoded } from 'express';
import ProductController from './src/controllers/product_1.controller.js';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts'
import { validateRequest } from './src/middlewares/validation_1.middleware.js';
const server = express();

server.use(express.static('public'));

// create ejs template it is similar to html

// ejs template let you insert js in html and convert dynamic template or ejs to plain html file browser only understand plain html so ejs convert to plain html

// setup view engine settings 
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), 'src','views'))

server.use(express.urlencoded({extended : true}))

server.use(ejsLayouts);

const ProductObj = new ProductController();


server.get('/',ProductObj.getProducts);
server.get('/new',ProductObj.getAddForm);
server.post('/',validateRequest,ProductObj.addNewProduct);
server.get('/update-product/:id',ProductObj.getUpdateProductView);
server.post('/update-product',ProductObj.postUpdateProduct);
server.post('/delete-product/:id',ProductObj.deleteProduct);

server.listen(3401,()=>{
    console.log("server is listining");
})