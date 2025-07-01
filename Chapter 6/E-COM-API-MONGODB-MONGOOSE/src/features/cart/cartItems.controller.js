import { ApplicationError } from "../../error-handler/applicationError.js";
import CartItemModel from "./cartItems.model.js";
import CartItemsRepository from "./cartItems.repository.js";

export class CartItemsController{

    constructor(){
        this.cartItemsRepository = new CartItemsRepository();
    }
    async add(req,res){
        try{
            
        const {productID, quantity} = req.query;
        const userID = req.userID;
        await this.cartItemsRepository.add(productID,userID,quantity);
        res.status(201).send("Cart is updated");
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
        }
    }

    async get(req,res){
        const userID = req.userID;
        const items = await this.cartItemsRepository.get(userID);
     
        return res.status(200).send(items);
    }

    async delete(req,res){
        const userID = req.userID;
        const cartItemID = req.body.id;
        const result = await this.cartItemsRepository.delete(cartItemID,userID);
        if(result){
            return res.status(200).send('Cart Item is removed');
        }else{
            return res.status(200).send('Cart Item not found');
        }
        
    }
}