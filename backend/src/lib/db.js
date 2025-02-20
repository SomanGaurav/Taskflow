import mongoose from "mongoose";
import { _environmentVariable } from "../_config.js";

export const connectDb = async() => {
    const {MONGODB_URI} = _environmentVariable ; 
    try{
        const conn = await mongoose.connect(MONGODB_URI); 
        console.log(`MongoDB connected on host ${conn.connection.host}`);
    }catch(error){
        console.log(`Error in db connection :- ${error}`);
    };
    
}