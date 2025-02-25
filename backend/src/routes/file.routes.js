import express from "express"; 
import { protectRoute } from "../middleware/auth.middleware.js";
import { deleteFile, getUserFiles, readFile, updateFile, uploadFile } from "../controllers/files.controllers.js";
import { multerInstance } from "../lib/file_store.js";

const Router = express.Router(); 
const upload = multerInstance(); 
Router.post("/upload" , protectRoute, upload.single('file') , uploadFile); 
Router.delete("/delete/:fileid" , protectRoute , deleteFile);
Router.get("/read/:fileId" , protectRoute , readFile);
Router.put("/update/:fileId/:newName" , protectRoute , updateFile); 
Router.get("/userfiles" , protectRoute , getUserFiles); 
export default Router ; 