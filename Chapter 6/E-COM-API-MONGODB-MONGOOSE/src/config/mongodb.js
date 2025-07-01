import { MongoClient } from "mongodb";


// const url = process.env.DB_URL;
// console.log(url);
let client;
export const connectToMongoDB = ()=>{
    MongoClient.connect(process.env.DB_URL).then((clientInstance)=>{
        client = clientInstance;
        console.log("Mongodb is connected");
        createCounter(client.db());
        createIndexes(client.db());
    }).catch((err)=>{
        console.log(err);
    })
}

export const getClient = ()=>{
    return client;
}

export const getDB=()=>{
    return client.db();
}

const createCounter = async(db)=>{
    const existingCounter = await db.collection("counters").findOne({_id:"cartItemId"});
    if(!existingCounter){
        await db.collection('counters').insertOne({
            _id:'cartItemId', value : 0
        })
    }
}

const createIndexes = async(db)=>{
    try{
        await db.collection("products").createIndex({
            price:1
        });
        await db.collection("products").createIndex({
            name:1,category:-1
        });
         await db.collection("products").createIndex({
            desc:"text"
        });
        console.log('Indexes are created');
    }catch(err){
        console.log('err',err);
    }
}

// indexs make write operation slower why if you insert any document it has to update the index and store the document in index storage and in collection so this operation make the write operation slower