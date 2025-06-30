import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export class ProductRepository{

    constructor(){
        this.collection = "products";
    }

    async add(newProduct){
          try{        

                // 1.Get the database
                const db = getDB();
        
                // 2. Get the collection
                const collection = db.collection("products");

                
                // 3. Insert the document.
                await collection.insertOne(newProduct);
                 return newProduct;
                
                }catch(err){
                    throw new ApplicationError("Something went wrong",500);
                }
    }


    async getAll(){
         try{        
                    // 1.Get the database
                    const db = getDB();
            
                    // 2. Get the collection
                    const collection = db.collection(this.collection);
                    // 3. Find the document.
                    return await collection.find().toArray();
                    }catch(err){
                        throw new ApplicationError("Something went wrong",500);
                    }
    }

    async get(id){
        try{        
                    // 1.Get the database
                    const db = getDB();
            
                    // 2. Get the collection
                    const collection = db.collection(this.collection);
                    // 3. Find the document.
                    return await collection.findOne({_id: new ObjectId(id)});
                    }catch(err){
                        throw new ApplicationError("Something went wrong",500);
                    }

    }

     async filter(minPrice,categories){
        try{        
                    // 1.Get the database
                    const db = getDB();
            
                    // 2. Get the collection
                    const collection = db.collection(this.collection);
                    // 3. Find the document.
                    let filterExpression = {};

                    if(minPrice){
                        filterExpression.price = {$gte : parseFloat(minPrice)}
                    }

                    //  if(maxPrice){
                    //     filterExpression.price = {...filterExpression.price, $lte : parseFloat(maxPrice)}
                    // }

                    // ['Cat1',Cat2]
                    categories = JSON.parse(categories.replace(/'/g,'"'));

                     if(categories){
                        filterExpression = {$or:[{category:{$in:categories}},filterExpression]};
                        
                    }

                    return await collection.find(filterExpression).project({name:1,price:1,_id:0,ratings:{
                        $slice : 1
                    }}).toArray();// slice can be part of find or projection(1 is return first value of array -1 one will return last value of the array)
                    }catch(err){
                        console.log(err);
                        throw new ApplicationError("Something went wrong",500);
                    }

    }

    // async rateProduct(userID, productID, rating){
    //     try{        
    //                 // 1.Get the database
    //                 const db = getDB();
            
    //                 // 2. Get the collection
    //                 const collection = db.collection(this.collection);

    //                 // 1. Find the Product
    //                 const product = await collection.findOne({_id : new ObjectId(productID) });

    //                 const userRating = await product?.ratings?.find(r => r.userID == userID);
    //                 console.log('userRating',userRating);
    //                 if(userRating){
    //                      await collection.updateOne({
    //                     _id : new ObjectId(productID), "ratings.userID" : new ObjectId(userID)// this will return rating with userid and rating {userid and rating}
    //                 },
    //                 {
    //                     $set:{
    //                         "ratings.$.rating":rating // $ will give you first document of above search function updateOne
                        
    //                     }
    //                 })    
    //                 }else{
    //                      await collection.updateOne({
    //                     _id : new ObjectId(productID)
    //                 },{
    //                     $push : {ratings : {
    //                         userID : new ObjectId(userID),rating
    //                     }}
    //                 })
    //                 }
                    
    //                 }catch(err){
    //                     throw new ApplicationError("Something went wrong",500);
                        
    //                 }

    // }


    // raise condition
        async rateProduct(userID, productID, rating){
        try{        
                    // 1.Get the database
                    const db = getDB();
            
                    // 2. Get the collection
                    const collection = db.collection(this.collection);

                    // 1. Removes existing entry
                    await collection.updateOne({
                        _id:new ObjectId(productID)
                    },{
                        $pull:{
                            ratings : {
                                userID : new ObjectId(userID)
                            }
                        }
                    })
                    // 2. Add new entry
                    await collection.updateOne({
                        _id:new ObjectId(productID)
                    },{
                        $push:{
                            ratings : {
  
                                    userID : new ObjectId(userID),
                                    rating: rating
                            }
                        }
                    })
                    }catch(err){
                        console.log(err);
                        throw new ApplicationError("Something went wrong",500);
                        
                        
                    }

    }
    
    async averageProductPricePerCategory(){
        try{

            const db = getDB();
            return await db.collection(this.collection).aggregate([
                {
                    // Stage 1: Get average price per category
                    $group:{
                        _id:"$category",
                        averagePrice : {
                            $avg : "$price"
                        }
                    }
                }
            ]).toArray();

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500)
        }
    }


}