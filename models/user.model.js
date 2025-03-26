import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:false
    },
    profileImage:{
        type:String,
        required:false
    }
},{timestamps:true});

const User = mongoose.model('User', userSchema);
export default User;