import {create} from "zustand"; 
import { axiosInstance } from "../utils/AxiosInstance";


export const AuthStore = create((set , get)=>({
    authUser : null , 
    isSigningUp : false , 
    isLoggingIn : false , 
    isCheckingAuth : true ,
    
    
    login : async(data)=>{
        set({isLoggingIn : true}); 
        try{
            const res = await axiosInstance.post("/auth/login" , data); 
            set({authUser : res.data}); 
            console.log("Logged in successfully"); 
        }catch(error){
            console.log(error.response.data.message);
        }finally{
            set({isLogginIn:false}); 
        }
    }, 

    checkAuth : async() => {
        try {
            set({isCheckingAuth : true})
            const res = await axiosInstance.get("/auth/checkAuth"); 
            set({authUser : res.data}); 
        }catch(error){
            console.log("Error in checkAuth :- " , error.response.data.message); 
        }finally{
            set({isCheckingAuth : false})
        }
    }
}))