import { File } from "../models/file.model.js"
import fs from "fs"; 


export const uploadFile = async(req , res) => {
    try {
        if(req.file){
            const newFile = new File({
                userId : req.user._id , 
                fileName : req.file.originalname , 
                filePath : req.file.destination , 
            })
    
            if(newFile){
                await newFile.save(); 
                res.status(201).json(newFile);
            }
        }
    } catch (error) {
        console.log(`Error in file upload controller :- ${error.message}`);
        res.status(500).json({message : "Internal server error"}); 
    }
}

export const deleteFile = async(req , res)=> {
    try {
        const fileid = req.params.fileid ; 
        const fileInfo = await File.findById(fileid)
        if(!fileInfo){
            return res.status(404).json({message : "File not found"});
        }
        fs.unlink(`${fileInfo.filePath}\\${fileInfo.fileName}` ,(err , stats)=> {
            if(err){
                return res.status(400).json({message : "Invalid File data"}); 
            }
        })
        await fileInfo.deleteOne(); 
        res.status(200).json({message : "File deletion successful"});
    } catch (error) {
        console.log(`Error in File delete Controller :- ${error.message}`); 
        res.status(500).json({message : `Internal Server Error`}); 
    } 
}
