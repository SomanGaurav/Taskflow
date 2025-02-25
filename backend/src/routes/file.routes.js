import express from "express"; 
import { protectRoute } from "../middleware/auth.middleware.js";
import { deleteFile, uploadFile } from "../controllers/files.controllers.js";
import { multerInstance } from "../lib/file_store.js";

const Router = express.Router(); 
const upload = multerInstance(); 
Router.post("/upload" , protectRoute, upload.single('file') , uploadFile); 
Router.delete("/delete/:fileid" , protectRoute , deleteFile)
export default Router ; 