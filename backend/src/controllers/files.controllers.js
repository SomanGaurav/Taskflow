import mongoose from "mongoose";
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


export const readFile = async(req , res) => {
    try {
        const fileId = req.params.fileId ; 
        const fileResponse = await File.findById(fileId); 
        if(!fileResponse){
            return res.status(404).json({message : "File not found"}) ; 
        }
        res.status(200).download(`${fileResponse.filePath}\\${fileResponse.fileName}`);

    } catch (error) {
        console.log(`Error in File read controller ${error.message}`); 
        res.status(500).json({message : "Internal Server Error"}); 
    }
}


export const updateFile = async(req ,res)=>{
    try {
        const fileId = req.params.fileId; 
        const fileResponse = await File.findById(fileId); 
        if(!fileResponse){
            return res.status(404).json({message : "File not found"}) ; 
        }
        if(req.params.newName){  
            fs.rename(`${fileResponse.filePath}\\${fileResponse.fileName}` ,`${fileResponse.filePath}\\${req.params.newName}` ,(err)=>{
                if(err){
                    return res.status(400).json({message : "Invalid File data"}); 
                }
                fileResponse.fileName = req.params.newName ; 
            });

            await fileResponse.save();
            res.status(200).json(fileResponse); 
        }else{
            res.status(400).json({message : "Mention fileId newName"}); 
        }
    
    } catch (error) {
        console.log(`Error in file update route :- ${error.message}`); 
        res.status(500).json({message : "Internal Server Error"});    
    }
}


export const getUserFiles = async(req , res)=>{
    try {
        const userId = req.user._id ; 
        const fileResponse = await File.find({userId : userId}); 
        if(!fileResponse){
            return res.status(400).json({message : "User has no files stored"}); 
        }
        res.status(200).json(fileResponse); 
    
    } catch (error) {
        console.log(`Error in get user files controller :- ${error.message}`)
        res.status(500).json({message : "Internal Server Error"}); 
    }
 
}