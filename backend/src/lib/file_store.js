import multer from "multer";

export const  multerInstance = () => {
    const storage = multer.diskStorage({
        destination : function(req , file , cb){
            cb(null , String.raw`C:\Users\gaura\OneDrive\Desktop\Devlopment\Projects\Taskflow\backend\uploads`) ; 
        }, 
        filename : function(req , file , cb){
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
            cb(null ,file.originalname)
        }
    })
    const upload = multer({storage : storage}); 
    return upload ;
}