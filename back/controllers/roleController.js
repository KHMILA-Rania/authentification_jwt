const Role=require('../models/role');
const mongoose = require('mongoose');

//add
const addRole=async (req,res)=>{
    try{
        const {name}=req.body;
        if (!name|| name.trim() === '') {
            console.error('Role field is missing or empty'); // Debugging log
            return res.status(400).send("Role field is required and cannot be empty");
        }
        const role=new Role({
            name
        });
        const savedRole=await role.save();
        console.log(savedRole);
    }
    catch(err){
        res.status(500).json({ message:err.message})
    }
}

//updateRole
const updateRole=async(req,res)=>{
    try {
        const updatedRole = await Role.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
          
        );
        console.log("mrygl");
        res.json(updatedRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

//get all
const getRoles=async(req, res)=>{
    try{
        const allroles=await Role.find();
        res.json(allroles);
    }
    catch(err){
        res.status(500).json({ message:err.message });
    }
}
//delete 
const deleteRole=async(req, res)=>{
    try{
       const  deletedRole=await Role.findByIdAndDelete(req.params.id);
        if (!deletedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.json({ message: 'client deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

}

module.exports={
    addRole,
    updateRole,
    getRoles,
    deleteRole
}