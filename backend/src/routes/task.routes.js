import express from "express"; 
import { protectRoute } from "../middleware/auth.middleware.js";
import { createTask, readTask, updateStatusSubTask } from "../controllers/task.controllers.js";

const Router = express.Router(); 

Router.post("/create" , protectRoute , createTask); 
Router.get("/read" , protectRoute , readTask ); 
Router.get("/read/:id" , protectRoute , readTask ); 
Router.put("/updatestatus" , updateStatusSubTask); 
export default Router ; 