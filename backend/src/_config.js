import { config } from "dotenv";


config({path : './.env.local'}); 

export const _environmentVariable = {
    PORT : process.env.SERVER_PORT , 
    ENV  : process.env.SERVER_ENVIRONMENT , 
    MONGODB_URI : process.env.MONGODB_URI , 
    JWT_SECRET : process.env.JWT_SECRET , 
}


