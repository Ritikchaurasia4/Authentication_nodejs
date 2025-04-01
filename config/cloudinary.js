import {v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})
const uploadOnCloudinary = async (filePath) =>{
    try{
        if(!filePath){
            return null;
        }
        let result = cloudinary.uploader.upload(filePath);
        console.log(result);
        fs.unlink(filePath);
        return result.secure_url;
    }
    catch(error){
        fs.unlink(filePath);
        console.log(error);
    }
}
export default uploadOnCloudinary;