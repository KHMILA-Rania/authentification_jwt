//we ll create a middleware

const jwt = require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
    const token=req.cookies.token;
    console.log('Access Token:', token);
    if(!token){
        return res.status(401).send(" verify token :not authenticated");
    }
    console.log('JWT Secret:', process.env.JWT_SECRET);
    jwt.verify(token,process.env.JWT_SECRET,(err, user)=>{
        if(err){
            console.log('JWT Verification Error:', err);
            return res.status(403).send("not valid");
        }
        req.user=user;
        console.log('Verified User:', user);
        next();
    });

}

const verifyUser=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return res.status(401).send("not authorized");
        }
    })
}

const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user && req.user.isAdmin){
            next()
        }else{
            return res.status(401).send("not authorized")
        }
    })
}

module.exports={
    verifyToken,
    verifyUser,
    verifyAdmin
}