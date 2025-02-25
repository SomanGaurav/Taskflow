import dotenv from "dotenv"; 
dotenv.config({path : "./.env.local"}); 
import express from "express"; 
import cookieParser from "cookie-parser";
import cors from "cors"; 

import { connectDb } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js"
import taskRoutes from "./routes/task.routes.js"
import fileRoutes from "./routes/file.routes.js"
const app = express();
const PORT = process.env.SERVER_PORT || 3000 ; 
app.use(express.json()); 
app.use(cookieParser()); 
app.use(cors({
    origin : "http://localhost:5173" , 
    credentials : true 
})); 


app.use("/api/auth" , authRoutes); 
app.use("/api/task" , taskRoutes); 
app.use("/api/file" ,fileRoutes ); 


app.listen(PORT , ()=>{
    console.log(`Server running on port :- ${PORT}`); 
    connectDb(); 
})