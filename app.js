import express from "express";
import userRouter from "./routes/user.js";
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js"
import { errorMiddleWare } from "./middleware/error.js";
import cors from "cors"

config({
    path: "./data/.env"
});

export const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    //CREDENTIALS:true,
    credentials:true,

}))


app.use("/api/v1",userRouter);
app.use("/api/v1/task",taskRouter);


app.get("/",(req,res)=>{
    res.send("Home page")
});


// using error middle Ware
app.use(errorMiddleWare)