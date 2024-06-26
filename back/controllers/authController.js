const Role=require ('../models/role')
const User=require ('../models/User')
const bcrypt =require('bcrypt');
const jwt=require('jsonwebtoken');

const register=async (req,res)=>{
    try{
    const role=await Role.findOne({name:'User'});
    const salt=await bcrypt.genSalt(10);
    const hashpassword= await bcrypt.hash(req.body.password,salt);

    console.log("Registering user:", req.body);

    const newUser=new User({
    firstName:req.body.firstName,
    email:req.body.email,
    lastName:req.body.lastName,
    userName:req.body.userName,
    password:hashpassword,
    roles:[role._id],
});

await newUser.save();
return res.status(200).json("user registered successfully");}
catch(err) {
    console.error("Error during user registration:", err);
        return res.status(500).json("Something went wrong");
}
} 

//login 
const login =async (req, res) => {
    try{
        const user=await User.findOne({email:req.body.email})
       .populate("roles", "name");
       const {roles}= user; 
       
       if (!user){
            return res.status(404).send("user not found");
        }

        const ispasswordCorrect= await bcrypt.compare(req.body.password,user.password);
        
        if(!ispasswordCorrect) {
            return res.status(404).send("password incorrect");
        }
        const token = jwt.sign({
            id: user._id, isAdmin: user.isAdmin, roles:user.roles
        },
    process.env.JWT_SECRET,{ expiresIn: '1h' });

    console.log('Generated token:', token);
    console.log('JWT Secret:', process.env.JWT_SECRET);
    
    res.cookie("token",token,{httpOnly :true , secure: process.env.NODE_ENV === 'production', sameSite: 'strict'});
    
    
    return res.status(200).json({
        status: 200,
        message: "Login successful",
        data: user
    });
    
     
    
    }

    catch(err){
        return res.status(500).send('something went wrong ');
    }
}

const registerAsAdmin=async (req,res)=>{
try{
    const role=await Role.find({});
    const salt=await bcrypt.genSalt(10);
    const hashpassword= await bcrypt.hash(req.body.password,salt);
    console.log("Registering admin:", req.body);
    const newUser=new User({
    firstName:req.body.firstName,
    email:req.body.email,
    lastName:req.body.lastName,
    userName:req.body.userName,
    password:hashpassword,
    isAdmin:true,
    roles:role,
});
await newUser.save();
return res.status(200).send("admin registered successfully");}
catch (err) {
    console.error("Error during admin registration:", err);
    return res.status(500).send("Something went wrong");
}
}

module.exports = {
    register,
     login,
    registerAsAdmin}