import { percentStatus } from "../lib/utils.js";
import Task from "../models/task.model.js";
import usertaskRelation from "../models/usertask.model.js";



export const createTask = async(req , res)=>{

    try {
        const task = req.body ; 
        const {taskName , taskCreated , taskDeadline , subTasks} = task ; 
        const assignedTo = task["assignedTo"]; 
        delete task.assignedTo ; 
        if(!taskName || !taskCreated || !taskDeadline){
            return res.status(400).json({message : "Name , date of creation and deadline is required"}); 
        }

        if(!assignedTo || assignedTo.length === 0){
            return res.status(400).json({message : "Task must be assigned to atleast one memeber"}); 
        }
        const percentageStatus = percentStatus(subTasks);
        task["taskProgress"] = percentageStatus.toFixed(3); 
        const date = new Date(); 
        task.taskCreated = {
            sessionNumber : taskCreated , 
            sessionDate : date 
        }
        const newTask = new Task(task); 
        if(newTask){
            await newTask.save(); 
            assignedTo.forEach((element , index) => {
                assignedTo[index] = {
                    userId : element , 
                    taskId : newTask._id ,
                }
            });

            console.log(assignedTo);
            await usertaskRelation.insertMany(assignedTo); 
            res.status(201).json(newTask); 
             
        }
        else{
            res.status(400).json({message : "Invalid User Data"}); 
        }


    } catch (error) {
        console.log(`Error in task create controller :- ${error.message}`);
        res.status(500).json({message : "Internal Server Error"}); 
    }

}


export const readTask = async(req , res)=> {
    try {
        if(!req.params.id){
            const taskResponse = await Task.find({}); 
            
            for(const element of taskResponse){
                let relResponse = await usertaskRelation.find({taskId : element._id}).select('userId -_id'); 
                relResponse.forEach((element1 , index)=> {
                    relResponse[index] = element1.userId.toString() ; 
                })
        
            }            
            return res.status(200).json({message : "Sending all the tasks"})
        }
        
        const response = await usertaskRelation.find({userId : req.params.id}).populate('taskId').exec(); 
        const task = response.map(userTask => userTask.taskId);
        const taskResponse = await Task.find({_id : {$in : task}}); 
        console.log(taskResponse);
        res.status(200).json({message : "Found tasks related to user"}); 
    } catch (error) {
        console.log(`Error in task read controller :- ${error.message}`);
    }   
}


export const updateStatusSubTask = async(req , res)=>{
    try {
        const reqBody = req.body ;  
        
        const taskResponse = await Task.findById("67bb21c34a4e227bf237dec7"); 
        if(taskResponse){
            taskResponse.subTasks = reqBody.subTasks ; 
            const percentageStatus = percentStatus(reqBody.subTasks);
            taskResponse.taskProgress = percentageStatus.toFixed(3); 
            await taskResponse.save(); 
            res.status(200).json({message : taskResponse});
        }
        else{
            res.status(404).json({message : `No task found for the corresponding ID`}); 
        }
        
    } catch (error) {
        console.log(`Error in task update status :- ${error.message}`);
        res.status(500).json({message : "Internal Server Error"});  
    }
}


export const deleteTask = async(req , res)=>{
    try {
        const taskId = req.params.taskid ; 
        const status = await Task.findByIdAndDelete(taskId); 
        res.status(200).json({message : status}); 
    } catch (error) {
        console.log(`Error in task delete controller :- ${error.message}`); 
        res.status(500).json({message : "Internal Server Error"}); 
    }
}