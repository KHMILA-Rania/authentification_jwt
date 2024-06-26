require('dotenv').config();
const express = require('express');
const mongoose= require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); 

const {verifyToken, verifyUser, verifyAdmin}=require('./utils/verifyToken');
const app = express({origin:'http://localhost:4200',credentials:true});


app.use(express.json());
app.use(cookieParser());
const cors= require('cors');
app.use(cors());




//role routes
const roleRoute=require('./routes/RoleRoute')
app.use("/role",roleRoute);

//auth routes
const authRoutes=require('./routes/Auth')
app.use("/auth",authRoutes);

//user routes
const userRoutes=require('./routes/User');
app.use("/user",userRoutes)



const connectMongo=async()=>{
    try{
        mongoose.connect(process.env.DB);
        console.log('connected to database');
    }
    catch(e)
    { console.error('Error connecting to database:', e); // Log the error for debugging
        throw e;}
}


app.listen(3000,()=>{
    connectMongo();
    console.log('listening on 3000');
});