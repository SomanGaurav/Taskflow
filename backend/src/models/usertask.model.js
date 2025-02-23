import mongoose from "mongoose";

const usertaskRelationSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId  , 
        required : true 
    } , 

    taskId : {
        type : mongoose.Schema.Types.ObjectId , 
        required : true 
    }
})


const usertaskRelation = mongoose.model("usertaskRelation" , usertaskRelationSchema); 

export default usertaskRelation ; 