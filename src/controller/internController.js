const mongoose=require("mongoose")
const collegeModel=require("../models/collegeModel")
const internModel=require("../models/internModel")
const {stringChecking,isvalidEmail,isvalidMobile}=require("../validators/validator")


const createIntern=async function(req,res){
    try{
    let data=req.body
    if(data.length==0){
        return res.status(400).send({status:false,msg:"fields are empty"})
    }
    let {name,mobile,email,collegeName}=data
    if(!name||!mobile||!email||!collegeName){
        return res.status(400).send({status:false,msg:"all fields are mandatory"})
    }
    const createData=await internModel.create(data)
    return res.status(201).send({status:true,msg:data})
}
catch(err){
    return res.status(500).send({status:false,msg:err.message})
}
}


const getIntern=async function(req,res){
    try{
    const data=req.query.collegeName
    const collegeCheck=await internModel.findOne({name:data.collegeName})
    if(!collegeCheck){
        return res.status(404).send({status:false,msg:"college not found"})
    }
    const {name,fullName,logoLink}=collegeCheck
    const internsList=await internModel.find({collegeId:collegeCheck._id})
    if(internsList.length==0){
        return res.status(400).send({status:false,msg:"no interns found"})
    }
    const finalData={name,fullName,logoLink,internslist}
    return res.status(200).send({status:true,msg:finalData})
    }
    catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }
}


module.exports.createIntern=createIntern
module.exports.getIntern=getIntern