
import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';

import authRouter from './Routes/authRoute.js';
import groupRouter from './Routes/groupRoute.js';

const app=express();
const PORT=process.env.PORT ||5000;
dotenv.config();

 //MIDDLEWARE
app.use(cors());
app.use(express.json());


//ROUTES
app.use('/auth',authRouter);
app.use('/group',groupRouter);


app.listen(PORT,()=>{
    console.log("server has started")
})

