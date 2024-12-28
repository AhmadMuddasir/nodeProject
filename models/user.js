import mongoose from "mongoose"
//database schena for schema
const schema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

export const User = mongoose.model("user",schema);
