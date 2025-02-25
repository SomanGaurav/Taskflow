import jwt from "jsonwebtoken"; 
import { _environmentVariable } from "../_config.js";


export const tokenGenerate = (userId , res)=>{
    const {JWT_SECRET , ENV} = _environmentVariable ; 
    const token = jwt.sign({userId} , JWT_SECRET , {
        expiresIn : "7d", 
    }); 

    res.cookie("tf-auth" , token , {
        maxAge : 7*24 * 60 * 60 * 1000 , 
        httpOnly : true , 
        sameSite : 'strict' , 
        secure : ENV !== "DEVELOPMENT",
    }); 

    return token ; 
}


export const percentStatus = (subTasks) => {
    let subTasksCount = 0 , subTaskCompleted = 0 ; 
    subTasks.forEach(element => {
        subTasksCount = subTasksCount + 1 ; 
        if(element.subTaskStatus){
            subTaskCompleted = subTaskCompleted + 1 ; 
        }
    });

    return subTaskCompleted * 100 / subTasksCount ; 
}