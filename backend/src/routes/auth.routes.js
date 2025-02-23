import express from "express";
import { checkAuth, login, logout, signup } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const Router = express.Router(); 

Router.post("/signup" , signup); 
Router.post("/login" , login); 
Router.post("/logout" , logout);
Router.get("/checkAuth" ,protectRoute ,  checkAuth); 
export default Router ; 