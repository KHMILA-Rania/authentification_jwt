const mongoose = require('mongoose');
const User=require('../models/User')

const getAllUsers=async(req,res)=>{
 
    try{
        const users= await User.find();
        return res.status(200).json({message: "all users",users:users})
    }catch(error){
      
        return res.status(500).send("error");
    }
    
}

const getUserById=async (req,res)=>{
    try{
        const user= await User.findById(req.params.id)
        if(!user){
            return res.status(404).send("user not found");

        }
        return res.status(200).json({message: "user",user:user})

    }catch(error){
        return res.status(500).send("error");
    }
}

module.exports={
    getAllUsers,
    getUserById
}