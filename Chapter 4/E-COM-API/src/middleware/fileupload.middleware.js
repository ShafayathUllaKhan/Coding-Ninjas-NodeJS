import multer from "multer";
import path from 'path';

const storeageconfig = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'./public/images/');
    },
    filename : (req,file,cb)=>{
        const name = new Date().toISOString().replace(/:/g,'_') + '-' + file.originalname;
        cb(null,name);
    }
});

const upload = multer({
    storage : storeageconfig
});

export default upload;

