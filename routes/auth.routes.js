import express, { Router } from 'express';
import { logout, signUp } from '../controllers/auth.controller.js';
import { login } from '../controllers/auth.controller.js';
import {upload} from '../middlewares/multer.js'

const userRoute = express(Router());

userRoute.post('/signup', upload.single('profilePicture'), signUp);
userRoute.post('/login', login); 
userRoute.get('/logout', logout); 

export default userRoute;