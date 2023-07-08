import mongoose from "mongoose";

export const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"backendapi"
    }).then((c)=>{console.log(`database connected ${c.connection.host}`)})
    .catch((err)=>{console.log(err)})
}
