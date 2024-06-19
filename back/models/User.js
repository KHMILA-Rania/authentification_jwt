const mongoose=require ('mongoose');
const Schema = mongoose.Schema; 
const userSchema=mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        userName:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            unique:true
        },
        profileImage:{
            type:String,
            required:false,

            default:"https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
        },
        email:{
            type:String,
            required:true,
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        roles:{
            type: [Schema.Types.ObjectId],
            required:true,
            ref:"Role"
        }

    },
    {
        timestapms:true,
    }
)

module.exports= mongoose.model("User",userSchema)