import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

export const signUp = async (req, res) => {
    try {
        let { firstName, lastName, userName, email, password } = req.body;     //1. first input details from user

        if (!firstName || !lastName || !userName || !email || !password) {
            return res.status(400).json({ message: "Send all details" });
        }

        let existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);          // 2. hash the password

        const newUser = await User.create({                              //3. create new user
            firstName,
            lastName,
            email,
            userName,
            password: hashedPassword,
        });

        let token;                                                   // 4. generate token
        try{
            token = generateToken(newUser._id);
        }
        catch(error){
            console.error(error);
            return res.status(500).json({ message: "Token generation error" });
        } 

        res.cookie("token", token, {                             // 5. send/parse the  token in cookie
            httpOnly: true,                  // prevent javascript access
            secure: process.env.NODE_ENVIRONMENT === "production", 
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        });

        return res.status(201).json({ firstName, lastName, userName, email });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


export const login = async (req, res) => {
    try {
        let { email, password } = req.body;   //1. first input details from user

        if (!email) {
            return res.status(400).json({ message: "Send all details" });
        }

        let existUser = await User.findOne({ email });
        if (!existUser) {
            return res.status(400).json({ message: "user does not exists" });
        }

        let match = await bcrypt.compare(password, existUser.password);   //2. compare the password using bcrypt

        if(!match){
            return res.status(400).json({ message: "Incorrect Password" });
        }
        

        let token;                                            // 3. generate token using jwt
        try{
            token = generateToken(existUser._id);
        }
        catch(error){
            console.error(error);
            return res.status(500).json({ message: "Token generation error" });
        } 

        res.cookie("token", token, {                            // 4. send/parse the  token in cookies
            httpOnly: true,                  // prevent javascript access
            secure: process.env.NODE_ENVIRONMENT === "production", 
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        });

        return res.status(200).json({user:{
            firstName:existUser.firstName, 
            lastName:existUser.lastName, 
            userName:existUser.userName,
            email:existUser. email
            } 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const logout = async (req, res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({message:"Logged out"});
    }
    catch(error){
        return res.status(500).json({ message: "Server error" });
    }
}