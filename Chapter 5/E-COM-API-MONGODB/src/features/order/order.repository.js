import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import OrderModel from "./order.model.js";
import { cli } from "winston/lib/winston/config/index.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


export default class OrderRepository{
    constructor(){
        this.collection = "orders";
    }

    async placeOrder(userId){
        const client = getClient();
            const session = client.startSession();
        try{
            
            const db = getDB();
            session.startTransaction();
            // 1. Get cartitems and calculate total amount
            const items = await this.getTotalAmount(userId);
            const finaltotalamount = items.reduce((acc,elem)=>{
            return  acc + elem.totalAmount;
                },0);
            
            const newOrder = new OrderModel(new ObjectId(userId),finaltotalamount,new Date());

            await db.collection(this.collection).insertOne(newOrder,{session});

            // 3. Reduce the stock.
            for(let item of items){
                await db.collection("products").updateOne({
                    _id: item.productID
                },{
                    $inc:{stock: -item.quantity}
                },{session})
            }

            //MongoServerError: Transaction numbers are only allowed on a replica set member or mongos
            //at Connection.sendCommand

            // mongod --replSet rs0 --dbpath=mongodb-data
            
            //throw new Error("Something is wrong in placeOrder");

            // 4. clear the cart items
            await db.collection("cartItems").deleteMany({
                userID : new ObjectId(userId)
            },{session})

            await session.commitTransaction();
            session.endSession();
            return;

        }catch(err){
            await session.abortTransaction();
            session.endSession();
            console.log('err',err);
                        throw new ApplicationError("Something went wrong with database", 500)
        }

        // 1. Get cartitems and calculate total amount.
        

        // 2. Create an order record.

        // 3. Reduce the stock.

        // 4. Clear the cart items.
    }

    async getTotalAmount(userId,session){
        const db = getDB();
        const items = await db.collection("cartItems").aggregate([
            // 1. Get Cart items for the user
            {
                $match:{userID : new ObjectId(userId)}
            },
            // 2. Get the products form products collection.
            {
                $lookup:{
                    from:"products",
                    localField:"productID",
                    foreignField:"_id",
                    as : "productInfo"
                }
            },
            // 3. Unwind the productinfo
            {
                $unwind:"$productInfo"
            },
            // 4. Calculate totalAmount for each cartitems.
            {
                $addFields:{
                    "totalAmount":{
                        $multiply:["$productInfo.price", "$quantity"]
                    }
                }
            }
        ],{session}).toArray();

        return items;
      


    }
}