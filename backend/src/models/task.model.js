import mongoose from "mongoose";
import User from "./user.model.js";
const taskSchema = new mongoose.Schema({
    taskName : {
        type : String , 
        required : true , 
    }, 

    taskPriority : {
        type : String , 
        enum : ["red" , "yellow" , "green"], 
        default : "green" , 
    }, 


    subTasks : [{
        _id : false , 
        subTaskName: {
            type: String,
        },
        subTaskStatus: {
            type: Boolean,
            default: false,
        },
    }], 

    taskProgress : {
        type : Number , 
        default : 0 , 
    }, 

    taskCreated : {
        sessionNumber: {
            type: Number,
            required: true,
        },
        sessionDate: {
            type: Date,
            required: true,
        },
         
    } , 

    taskDeadline : {
        type : Number , 
        required : true , 
    } , 

    taskCompletion : {
        type : Date , 
    }
}); 

const Task = mongoose.model("Task" , taskSchema); 

export default Task ; 