import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    name:String,
    price: Number,
    category:String,
    description: String,
    inStock: Number,
    reviews:[ // One to many
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    categories:[ // many to many
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Category'
        }
    ]
})