const mongoose=require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId;

const collegeSchema = new mongoose.Schema({
    name:{
     type:String,
     unique:true,
     required:true,
     trim:true
     
    },
    fullName:{
        type:String,
        required:true,
        trim:true

    },
    logoLink:{
        type:String,
        required:true,
        trim:true
        
    },
    idDeleted:{
        type:Boolean,
        default:false,
        
    }

},{timestamps:true});

module.exports=mongoose.model("college",collegeSchema)