import express from "express";

import { CartItemsController } from "./cartItems.controller.js";

const cartRouter = express.Router();

const cartController = new CartItemsController();

cartRouter.post("/",(req,res)=>{
    cartController.add(req,res)});

cartRouter.get("/",(req,res)=>{
    cartController.get(req,res)});

cartRouter.delete("/",(req,res)=>{
    cartController.delete(req,res)});

export default cartRouter;