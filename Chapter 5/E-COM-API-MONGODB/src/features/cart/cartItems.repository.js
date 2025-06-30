import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class CartItemsRepository{

    constructor(){
        this.collection = "cartItems";
    }

    async add(productID,userID,quantity){
         try{        
                    // 1.Get the database
                    const db = getDB();
            
                    // 2. Get the collection
                    const collection = db.collection(this.collection);

                    const id = await this.getNextCounter(db);
                    
           
                           // 3. Insert the document.
                    await collection.updateOne({productID: new ObjectId(productID),userID : new ObjectId(userID)},{
                        $setOnInsert:{
                            _id : id
                        },
                        $inc:{
                            quantity : parseInt(quantity)
                        }
                    },{upsert : true});
               
                    }catch(err){
                        console.log('err',err);
                        throw new ApplicationError("Something went wrong",500);
                    }
    }

    async get(userID){
         try{        
                    // 1.Get the database
                    const db = getDB();
            
                    // 2. Get the collection
                    const collection = db.collection(this.collection);
                    
                    
                    // 3. Insert the document.
                    return await collection.find({userID : new ObjectId(userID)}).toArray();// find returns cursor you should convert to array
                  
                    
                    }catch(err){
                        throw new ApplicationError("Something went wrong",500);
                    }
        
    }

    async delete(cartItemID,userID){
        try{        
                    // 1.Get the database
                    const db = getDB();
            
                    // 2. Get the collection
                    const collection = db.collection(this.collection);
                    
                    // 3. Insert the document.
                     const result = await collection.deleteOne({_id : new ObjectId(cartItemID),userID: new ObjectId(userID)});// find returns cursor you should convert to array
                   return result.deletedCount > 0;
                    
                    }catch(err){
                        throw new ApplicationError("Something went wrong",500);
                    }
    }

    async getNextCounter(db){
        const resultDocument = await db.collection('counters').findOneAndUpdate(
            {
                _id:'cartItemId'
            },{
                $inc:{
                    value : 1
                }
            },
            {
                returnDocument : 'after' // returnNewDocument : true
            }
        )
        return resultDocument.value;

    }
}