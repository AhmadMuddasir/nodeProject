import mongoose from "mongoose"
//database schema written here
const schema = new mongoose.Schema({
    title:String,
    description:{
        type:String,
        unique:true,
        required:true,
    },
    isCompleted:{
        type:Boolean,
        default:false
    },user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

export const Task = mongoose.model("Task",schema);
