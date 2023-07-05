import ErrorHandler from "../middleware/error.js";
import { Task } from "../models/task.js";


export const newTask = async (req, res, next) => {

   try {
    const { title, description } = req.body;

    await Task.create({
        title,
        description,
        user: req.user
    });

    res.status(201)
        .json({
            success: true,
            messege: "task added Successfully"
        })

   } catch (error) {
    next(error)
   }

}

export const getMyTask = async (req, res, next) => {
    try {
        const userid = req.user._id

        const tasks = await Task.find({user:userid});
    
        res.status(200).json({
            success:true,
            tasks,
        })
    } catch (error) {
        next(error)
    }

}


export const updateTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findById(taskId);
    
    
        task.isCompleted = !task.isCompleted;
        console.log(task.isCompleted);
    
        await task.save();
    
    
        res.status(200).json({
            success:true,
            messege:"task updated"
        })
    } catch (error) {
        next(error)
    }

}

export const deleteTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id);
        if(!task){
            return next(new ErrorHandler("invalid id check it",404))
        }
        await task.deleteOne(); 
    
        task.isCompleted = !task.isCompleted
    
        res.status(200).json({
            success:true,
            message:"task deleted"
        })
    } catch (error) {
        next(error)
    }

}
