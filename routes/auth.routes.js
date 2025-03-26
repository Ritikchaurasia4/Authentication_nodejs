import express, { Router } from 'express';
import { logout, signUp } from '../controllers/auth.controller.js';
import { login } from '../controllers/auth.controller.js';

const userRoute = express(Router());

userRoute.post('/signup', signUp); 
userRoute.post('/login', login); 
userRoute.get('/logout', logout); 

export default userRoute;