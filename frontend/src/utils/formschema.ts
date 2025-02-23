import { z } from "zod";


export const loginSchema = z.object(
    {
        email : z.string().email({message : "Enter a valid email"}) ,
        password : z.string().min(6 , {message : "Password must have atleast 6 characters"})
    }
); 


