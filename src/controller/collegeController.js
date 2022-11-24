const mongoose=require("mongoose")
const collegeModel=require("../models/collegeModel")
const internModel=require("../models/internModel")
const {stringChecking,isValidName,isValidlogolink,isValidAbbrv}=require("../validators/validator")


const createCollege=async function(req,res){
    try{
    let data=req.body
    if(data.length==0){
        return res.status(400).send({status:false,msg:"fields are empty"})
    }
    const  {name,fullName,logoLink}=data
    data.name=name.toLowerCase()
    data.name=name.trim()
    data.fullName=fullName.toLowerCase()
    data.fullName=fullName.trim()
    if(!name||!fullName||!logoLink){
        return res.status(400).send({status:false,msg:"all fields are mandatory"})
    }
   
    if(!stringChecking(name)){
        return res.status(400).send({status:false,msg:"invalid type of name"})
    }

     if(isValidName.test(name)){
           return res.status(400).send({status:false,msg:"provide valid "})
    }
    const uniqueName=await collegeModel.findOne({name})
    if(uniqueName){
        return res.status(400).send({status:false,msg:'name already exist'})
    }
    if(!isValidAbbrv.test(name)){
        return res.status(400).send({status:false,msg:"please give a valid input"})
    }

if(!stringChecking(fullName)){
    return res.status(400).send({status:false,msg:"invalid full nametype"})
}  
if(!isValidlogolink.test(logoLink)){
    return res.status(400).send({status:false,msg:"invalid link type"})
}
 const createData=await collegeModel.create(data)
    return res.status(201).send({status:true,data:createData})
    }
    catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }

}

module.exports.createCollege=createCollege