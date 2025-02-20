import express from "express";
import { checkAuth, login, logout, signup } from "../controllers/auth.controllers.js";

const Router = express.Router(); 

Router.post("/signup" , signup); 
Router.post("/login" , login); 
Router.post("/logout" , logout);
Router.get("/checkAuth" , checkAuth); 
export default Router ; 