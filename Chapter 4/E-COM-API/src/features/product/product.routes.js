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

productRouter.get("/filter",productController.filterProducts);
productRouter.get("/",productController.getAllProducts);
productRouter.post("/",upload.single('imageUrl'),productController.addProduct);
productRouter.get("/:id",productController.getOneProduct);
productRouter.post("/rate",productController.rateProducts);

export default productRouter;