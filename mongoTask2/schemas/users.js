import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name : {type : String , required : true},
    age : {type : Number , required : true},
    email : {type : String , required : true},
    password : {type : String , required : true},
    purchased_products : {type : Array , required : false},
    roles : {type : Array, default: 'customer'}
});

export const user = mongoose.model("user" , userSchema , "users");