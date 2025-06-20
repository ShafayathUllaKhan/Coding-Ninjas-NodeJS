import  express, { urlencoded } from 'express';
import ProductController from './src/controllers/product_1.controller.js';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts'
import { validateRequest } from './src/middlewares/validation_1.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import UserController from './src/controllers/user.controller.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';



const server = express();

server.use(express.static('public'));

server.use(cookieParser()); // req.cookies res.cookie

server.use(setLastVisit);


server.use(session({
    secret:'SecretKey',
    resave: false,
    saveUnintialized: true,
    cookie : {
        secure : false
    }
}));



// create ejs template it is similar to html

// ejs template let you insert js in html and convert dynamic template or ejs to plain html file browser only understand plain html so ejs convert to plain html

// setup view engine settings 
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), 'src','views'))

server.use(express.urlencoded({extended : true}))

server.use(ejsLayouts);

const ProductObj = new ProductController();
const usersController = new UserController();

server.get('/',auth ,ProductObj.getProducts);
server.get('/new',auth,ProductObj.getAddForm);
server.post('/',auth,uploadFile.single('imageUrl'),validateRequest,ProductObj.addNewProduct);
server.get('/update-product/:id',auth,ProductObj.getUpdateProductView);
server.post('/update-product',auth,uploadFile.single('imageUrl'),validateRequest,ProductObj.postUpdateProduct);
server.post('/delete-product/:id',auth,ProductObj.deleteProduct);

// session and cookies project
server.get('/register',usersController.getRegister);
server.get('/login',usersController.getLogin);
server.post('/register',usersController.postRegister);
server.post('/login',usersController.postLogin);
server.get('/logout',usersController.logout);

server.listen(3401,()=>{
    console.log("server is listining");
})