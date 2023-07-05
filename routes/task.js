import  express  from "express";
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new",isAuthenticated,newTask);

router.get("/my",isAuthenticated,getMyTask);

//  this params should be always at last
router.route("/:id").put(updateTask).delete(deleteTask)

export default router