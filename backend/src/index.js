import dotenv from "dotenv"; 
dotenv.config({path : "./.env.local"}); 
import express from "express"; 
import cookieParser from "cookie-parser";


import { connectDb } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js"

const app = express();
const PORT = process.env.SERVER_PORT || 3000 ; 
app.use(express.json()); 
app.use(cookieParser()); 



app.use("/api/auth" , authRoutes); 


app.listen(PORT , ()=>{
    console.log(`Server running on port :- ${PORT}`); 
    connectDb(); 
})