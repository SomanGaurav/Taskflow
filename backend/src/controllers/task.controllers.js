


export const createTask = async(req , res)=>{
    const task = req.body ; 
    res.status(201).json({message : {task : task , "message" : "Task received"}});
}