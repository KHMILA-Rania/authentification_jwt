const Role=require ('../models/role');
const User=require ('../models/User')
const bcrypt =require('bcrypt');
const jwt=require('jsonwebtoken');
const UserToken=require ('../models/UserToken');
const nodemailer=require('nodemailer');


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

        console.log('Request body:', req.body);
        const user=await User.findOne({email:req.body.email})
       .populate("roles", "name");

       
       if (!user){
        console.log('User not found');
            return res.status(404).send("user not found");
        }
        console.log('User found:', user);
        const ispasswordCorrect= await bcrypt.compare(req.body.password,user.password);
        
        if(!ispasswordCorrect) {
            console.log('Password incorrect');
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
        console.error('Error during login:', err);
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
const sendEmail=async(req,res,next) => {
    const email=req.body.email;
    const user=await User.findOne({email:{$regex:'^'+email+'$',$options:'i'}})
    if(!user){
        return res.status(404).json("user not found")
    }
    const payload={
        email: user.email,
    }
    const expiryTime=300;
    const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:expiryTime} )
    const newToken=new UserToken ({
        userId: user._id,
        token: token
    });
    const mailTranspoter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"rania.khmila@gmail.com",
            pass:"mfcj wuix coed fwwv"
        }
    });
    mailDetails={
        from:"rania.khmila@gmail.com",
        to: email,
        subject:"Reset Password",
        html:`
        <html>
        <head>
        <h1>Reset Password</h1>
       
        </head>
        <body>
         <p> Dear ${user.userName}, </p>
         <p>we have recieved a request to reset your password. To complete the password resert process ,
         please click on the button below <a href=${process.env.LIVE_URL}/reset/${token}>reset</a>.</p>

         <p>Let's program team </p>
         </body>
        </html>`,
    };
    mailTranspoter.sendMail(mailDetails,async(err,data)=>{
        if(err) {
            console.log(err);
            return ('error');
        }
        else{
            await newToken.save();
            return ('success');
        }
    })
}
const resetPassword =async(req,res)=>{
    const token=req.body.token;
    const newPassword=req.body.password;
    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and new password must be provided' });
    }
    jwt.verify(token,process.env.JWT_SECRET,async(err,data)=>{
        if(err){
            
            return res.status(500).json(err);
        }else{
            const response=data;
            const user=await User.findOne({email:{$regex:'^'+response.email+'$',$options:'i'}});
            console.log(response.email);
            const salt=await bcrypt.genSalt(10);
            const encryptedPassword=await bcrypt.hash(newPassword,salt)
            user.password=encryptedPassword;
            try{
                const updatedUSer=await User.findOneAndUpdate(
                    {_id:user._id},
                    { $set:user},
                    {new:true}
                   
                )
                await updatedUSer.save();
                return ('success')
            }
            catch(err){
                return res.status(500).json( err)
            }
        }
    })
}

module.exports = {
    register,
     login,
    registerAsAdmin,
    sendEmail,
    resetPassword,
}