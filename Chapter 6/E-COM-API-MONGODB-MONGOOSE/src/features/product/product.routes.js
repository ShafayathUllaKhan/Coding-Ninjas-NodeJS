// manage routes / paths to product controller

// 1. Import express.
import express from "express";
import ProductController from "./product.controller.js";
import upload from "../../middleware/fileupload.middleware.js";

// 2. Initialize Express router
const productRouter = express.Router();

const productController = new ProductController();

// All the paths to controller methods.
// localhost/api/products

//http://localhost:3200/api/products/filter?minPrice=10&maxPrice=50

productRouter.get("/filter",(req,res)=>{
    productController.filterProducts(req,res)});

productRouter.get("/",(req,res)=>{
    productController.getAllProducts(req,res)});

productRouter.post("/",upload.single('imageUrl'),(req,res)=>{
    productController.addProduct(req,res);
}
);

productRouter.post("/rate", (req,res,next)=>{productController.rateProducts(req,res,next)});

productRouter.get("/averagePrice", (req,res,next)=>{productController.averagePrice(req,res,next)});

productRouter.get("/:id",
    (req,res)=>{
    productController.getOneProduct(req,res);
});

export default productRouter;