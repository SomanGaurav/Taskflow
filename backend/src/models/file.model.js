import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'User' , 
        required : true 
    } , 

    fileName : {
        type : String , 
        required : true , 
        unique : true , 
    }, 

    filePath : {
        type : String , 
        required : true , 
    }, 

    uploadDate : {
        type : Date , 
        default : Date.now
    }
}) 

export const File = mongoose.model('File' , fileSchema);