import ProductModel from "./product.model.js";
import { ProductRepository } from "./product.repository.js";
export default class ProductController{

    constructor(){
        this.productRepository = new ProductRepository();
    }

    async getAllProducts(req,res){
        try{
            const products = await this.productRepository.getAll();
            res.status(200).send(products);
        }catch(err){
            return res.status(200).send("Something went wrong");
        }
     
    }

    async addProduct(req,res){
        try{
            
        const {name,desc, price,sizes,category} = req.body;
        const newProduct = new ProductModel(name,desc, parseFloat(price), req.file.filename,category, sizes.split(','));

       
        const createdRecord = await this.productRepository.add(newProduct);
        res.status(201).send(createdRecord);
        }catch(err){
            console.log('hi');
            return res.status(200).send("Something went wrong");
        }
    }

     async getOneProduct(req,res){
        try{
            const id = req.params.id;
        const product = await this.productRepository.get(id);
        if(!product){
            res.status(404).send("Product not found");
        }else{
            return res.status(200).send(product);
        }
        }catch(err){
            return res.status(200).send("Something went wrong");
        }
        
    }

     async filterProducts(req,res){
        try{
            
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.categories;

        const result = await this.productRepository.filter(minPrice,maxPrice,category);
        res.status(200).send(result);
        }catch(err){
            return res.status(200).send("Something went wrong");
        }
    }

    async rateProducts(req,res,next){
        try{
            
        const userID = req.userID;
        const productID = req.body.productID;
        const rating = req.body.rating;
  
         await this.productRepository.rateProduct(userID,productID,rating);
    
        return res.status(200).send('Rating added Successfully');
        }catch(err){
            //console.log("Passing error to middleware");
            next(err);
        }
        
    }

    async averagePrice(req,res,next){
        try{
            const result = await this.productRepository.averageProductPricePerCategory();
            res.status(200).send(result);
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong")
        }
    }
}