const mongoose = require('mongoose');

const roleSchema=mongoose.Schema({
   name:{
        type:String,
        
    },

},
{
    timestamps:true,
}
);

module.exports=mongoose.model('Role', roleSchema);