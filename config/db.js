import mongoose from 'mongoose';

const dbConnect = async () =>{
    try{
        await mongoose.connect(process.env.BACKEND_URL);
        console.log("db connected");
    }
    catch(error){
        console.log(error);
    }
}

export default dbConnect;