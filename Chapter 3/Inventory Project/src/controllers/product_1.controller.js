import path from 'path';
import ProductModel from '../models/product_2.model.js';

export default class ProductController{
    getProducts(req,res){
       // console.log(path.resolve());// note resolve function will give you the full file location of file from which you start excuting

       let products = ProductModel.get();
        // return res.sendFile(path.join(path.resolve(), 'src','views', 'product.html'));
        res.render("product",{products:products, userEmail : req.session.userEmail})// this {} will call the middleware server.use(ejsLayouts); this middleware will call layout and there body will call product view and browser will take as one page only but in server there are two files layout and product thats what view engine and express does
    }

    // forms code
    getAddForm(req,res){
      return res.render("new-product",{errorMessage:null, userEmail : req.session.userEmail});
    }

    addNewProduct(req,res){
        // access data from form
        //console.log(req.body); // data is send in encoded format so use urlencoded

        // validate data by using just simple coding
        // const {name,price,imageUrl} = req.body;
        // let errors = [];
        // if(!name || name.trim() == ''){
        //     errors.push('Name is required');
        // }
        // if(!price || parseFloat(price) <1){
        //     errors.push('Price must be a positive value');
        // }
        // try{
        //     const validUrl = new URL(imageUrl);
        // }catch(err){
        //     errors.push('Url is invalid');
        // }
        // if(errors.length > 0){
        //     return res.render('new-product',{errorMessage : errors[0]});
        // }
        // controller job is to just send the response by reciving request these will break the rule of single responsibility
        const {name,desc,price} = req.body;
        const imageUrl = "images/" + req.file.filename;
        ProductModel.addProduct(name,desc,price,imageUrl);
        let products = ProductModel.get();
        console.log(products);
        return res.render('product',{products:products, userEmail : req.session.userEmail})
    }

    getUpdateProductView(req,res,next){
        // 1. if product exists the return view
        const {id} = req.params;
        const productFound = ProductModel.getById(id);
        if(productFound){
            res.render('update-product',{product: productFound, errorMessage:null, userEmail : req.session.userEmail});
        }
        // 2. else return errors.
        else{
            res.status(401).send("Product not found");
        }
    }

    postUpdateProduct(req,res){
        const {name,desc,price,id} = req.body;
        const imageUrl = "images/" + req.file.filename;
        console.log(imageUrl);
        ProductModel.update(name,desc,price,imageUrl,id);
        let products = ProductModel.get();
        return res.render('product',{products:products, userEmail : req.session.userEmail})
    }

    deleteProduct(req,res){
        const {id} = req.params;

         const productFound = ProductModel.getById(id);
        if(!productFound){
            return res.status(401).send("Product not found");
        }
        ProductModel.deleteProduct(id);
        let products = ProductModel.get();
        return res.render('product',{products:products, userEmail : req.session.userEmail})
    }
}

// view engine
// let message = ' A message from mars';
// <p><%= message %></p>

// ejs is a view engine or template engine

// for control flow <% %> 

// npm i ejs
