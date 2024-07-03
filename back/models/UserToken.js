const mongoose=require('mongoose');
const Schema = mongoose.Schema; 

const TokenSchema=mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    token:{
        type:String,
        required:true,
    },
    CreatedAt:{
        type:String,
        default:Date.now,
        expires:300
    }
})
module.exports= mongoose.model("Token",TokenSchema)