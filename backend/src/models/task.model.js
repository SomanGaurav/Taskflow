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

    assignedTo : [{
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'User' , 
    }] , 

    subTasks : [{
        type : {
            subTask : String , 
            subTaskStatus : Boolean , 
            default : false , 
        }
    }] , 

    taskCompletion : {
        type : Number , 
        default : 0 , 
    }, 

    taskCreated : {
        type : {
            sessionNumber : Number , 
            sessionDate : Date , 
        } , 
        required : true , 
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