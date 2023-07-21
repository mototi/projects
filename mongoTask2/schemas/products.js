import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    tilte : {type : String , required : true},
    price : {type : Number , required : true},
    rating : {type : Number , required : true},
    number_of_stocks : {type : Number , required : true}
});

export const product = mongoose.model("product" , productSchema , "products");