import express from 'express';
const app = express();

import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import userRoute from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
dotenv.config();

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 4000;

app.use('/api', userRoute)

app.listen(port, () => {     
  console.log(`Server is running on ${port}`);
  dbConnect();
});