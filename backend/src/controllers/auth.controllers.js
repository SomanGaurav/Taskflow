import { tokenGenerate } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"; 

export const signup = async(req , res) => {
    const {fullName , email , password} = req.body ; 
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message : "All fields are required"}); 
        }

        if(password.length < 6){
            return res.status(400).json({message : "Password must be atleast 6 characters"}); 
        }

        const user = await User.findOne({email}); 
        if(user) return res.status(400).json({message : "User already exists"}); 

        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password , salt); 

        const newUser = new User({
            fullName , 
            email , 
            password : hashedPassword ,
        }); 

        if(newUser){
            tokenGenerate(newUser._id , res); 
            await newUser.save(); 
            res.status(201).json({
                _id : newUser._id , 
                fullName : newUser.fullName , 
                email : newUser.email , 
            });
        }
        else{
            res.status(400).json({message : "Invalid User Data"}); 
        }


    } catch (error) {
        console.log(`Error in signup controller :- ${error.message}`);
        res.status(500).json({message : "Internal Server Error "});
    }

}


export const login = async(req , res)=> {
    const {email , password} = req.body ; 
    try {
        if(!email || !password){
            return res.status(400).json({message : "All fields are required"}); 
        }

        const user = await User.findOne({email}); 
        if(!user){
            return res.status(400).json({message : "Invalid Credentials"}); 
        }

        const isPasswordCorrect = await bcrypt.compare(password , user.password); 
        if(!isPasswordCorrect){
            return res.status(400).json({message : "Invalid Credentials"}); 
        }

        tokenGenerate(user._id , res); 
        res.status(200).json({
            _id : user._id , 
            fullName : user.fullName , 
            email : user.email , 
        }); 
    } catch (error) {
        console.log(`Error in Login controller :- ${error.message}`);
        res.status(500).json({message : "Internal Server Error"}); 
    }
}

export const logout = async(req , res)=> {
    try {
        res.cookie("tf-auth" , {maxAge : 0});
        res.status(200).json({message : "User Logged Out successfully"}); 
    }
    catch(error){
        console.log(`Error in logout controller :- ${error.message}`);
        res.status(500).json({message : "Internal Server Error "});
    }
}

export const checkAuth = async(req , res)=>{
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}