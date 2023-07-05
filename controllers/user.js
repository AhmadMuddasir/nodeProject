import { User } from "../models/user.js";
import bcrypt, { hash } from "bcrypt"
import { sendCookie } from "../utils/featurs.js";
import ErrorHandler from "../middleware/error.js";








export const login =async (req,res,next)=>{


    try {
        const {email,password} = req.body;
        //for email
        const user = await User.findOne({email}).select("+password")
    
        if(!user){
            return next (new ErrorHandler("invalid",400))
        }
    
    
        // fro password
        const isMatch =  bcrypt.compare(password,user.password);
        
        if(!isMatch){
            return next (new ErrorHandler("invalid email or password",400))
        }
    
        sendCookie(user,res,`welcome back ${user.name}`,200);
    } catch (error) {
        next(error)
    }

};


export const register = async (req,res)=>{
try {
    const {name,email,password} = req.body;

    let user = await User.findOne({email});


    if(user) {
        return next (new ErrorHandler("user already exist",400));
    }

    const hashedPassword = await bcrypt.hash(password,10)

   user =  await User.create({name,email,password:hashedPassword})

   sendCookie(user,res,"registerd successfully",201);
} catch (error) {
    next(error)
}
   

};



export const getMyProfile = async (req,res)=>{

    res.status(200).json({
        success:true,
        user:req.user,
    })

};

export const logout = async (req,res)=>{

    res.status(200)
    .cookie("token","",{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
        secure:process.env.NODE_ENV === "DEVELOPMENT" ? false : true
    
    })
    .json({
        success:true,
        user:req.user
    })
}
