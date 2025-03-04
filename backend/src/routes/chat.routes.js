import express from "express"; 
import { liveMessage } from "../controllers/chat.controllers.js";

const Router = express.Router(); 

Router.get("/livemessage" , liveMessage); 

export default Router ; 