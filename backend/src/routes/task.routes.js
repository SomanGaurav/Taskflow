import express from "express"; 
import { protectRoute } from "../middleware/auth.middleware.js";
import { createTask } from "../controllers/task.controllers.js";

const Router = express.Router(); 

Router.post("/create" , protectRoute , createTask); 


export default Router ; 