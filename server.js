
import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';

import authRouter from './Routes/authRoute.js';
import groupRouter from './Routes/groupRoute.js';
import expenseRouter from './Routes/groupRoute.js';
import apiRouter from './Routes/apiRouter.js';

const app=express();
const PORT=process.env.PORT ||5000;
dotenv.config();

const corsOptions={
    origin:'*'
}

 //MIDDLEWARE
app.use(cors(corsOptions));
app.use(express.json());

app.get('/hello',(req,res)=>{
    res.json({message:'Inside splitwise'});
});

//ROUTES
app.use('/auth',authRouter);
app.use('/group',groupRouter);
app.use('/expense',expenseRouter);
app.use('/api/v3.0',apiRouter);


app.listen(PORT,()=>{
    console.log("server has started")
})

