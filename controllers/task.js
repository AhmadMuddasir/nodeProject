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
        const {title,description} = req.body


        const task = await Task.findById(taskId);

        if(!task){
            return res.status(404).json({
                succcess:false,
                message:"task not found",

            })
        }

        task.isCompleted = !task.isCompleted;

        if(title){
            task.title = title
        }
        if(description){
            task.description = description
        }
    
    
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
