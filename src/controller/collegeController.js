const mongoose=require("mongoose")
const collegeModel=require("../models/collegeModel")
const internModel=require("../models/internModel")
const {stringChecking,isValidName,isvalidlogolink}=require("../validators/validator")


const createCollege=async function(req,res){
    try{
    let data=req.body
    if(data.length==0){
        return res.status(400).send({status:false,msg:"fields are empty"})
    }
    const  {name,fullName,logoLink}=data
    data.name=name.toLowerCase()
    data.fullName=fullName.toLowerCase()
    if(!name||!fullName||!logoLink){
        return res.status(400).send({status:false,msg:"all fields are mandatory"})
    }
    if(!stringChecking(name)){
        return res.status(400).send({status:false,msg:"invalid type of name"})
    }
    const uniqueName=await collegeModel.findOne({name})
    if(uniqueName){
        return res.status(400).send({status:false,msg:'name already exist'})
    }

if(!isValidName.test(fullName)){
    return res.status(400).send({status:false,msg:"invalid full nametype"})
}  
if(!isvalidlogolink.test(logoLink)){
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