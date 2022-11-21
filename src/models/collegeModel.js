const mongoose=require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId;

const collegeSchema = new mongoose.Schema({
    name:{
     type:String,
     unique:true,
     required:true,
     
    },
    fullName:{
        type:String,
        required:true,

    },
    logoLink:{
        type:String,
        required:true,
    },
    idDeleted:{
        type:Boolean,
        default:false,
    }

},{timestamps:true});

module.exports=mongoose.model("college",collegeSchema)