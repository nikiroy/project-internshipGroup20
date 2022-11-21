const mongoose=require("mongoose")
const collegeModel=require("../models/collegeModel")
const internModel=require("../models/internModel")
const {stringChecking,isValidName}=require("../validators/validator")


const createCollege=async function(req,res){
    try{
    let data=req.body
    if(data.length==0){
        return res.status(400).send({status:false,msg:"fields are empty"})
    }
    const  {name,fullName,logoLink}=data
    if(!name||!fullName||!logoLink){
        return res.status(400).send({status:false,msg:"all fields are mandatory"})
    }
    const uniqueName=await collegeModel.findOne({name})
    if(uniqueName){
        return res.status(400).send({status:false,msg:'name already exist'})
    }
    if(!stringChecking(name))
{
    return res.status(400).send({status:false,msg:"not a valid inputtype"})
} 
if(!isValidName.test(fullName)){
    return res.status(400).send({status:false,msg:"invalid full nametype"})
}  
 const createData=await collegeModel.create(data)
    return res.status(201).send({status:true,msg:createData})
    }
    catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }

}

module.exports.createCollege=createCollege