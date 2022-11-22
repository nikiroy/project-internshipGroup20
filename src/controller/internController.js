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
    data.collegeName=collegeName.toLowerCase()
    data.name=name.toLowerCase()
    if(!name||!mobile||!email||!collegeName){
        return res.status(400).send({status:false,msg:"all fields are mandatory"})
    }
   
   const entries={}
    
    if(!stringChecking(name)){
        return res.status(400).send({status:false,msg:"not a valid type of input"})
    }
    entries.name=name
    
    
    if(!isvalidEmail.test(email)){

        return res.status(400).send({status:false,msg:"invalid email type"})
    }
    const emailCheck=await internModel.findOne({email:email})
    if(emailCheck){
        return res.status(400).send({status:false,msg:"email already in use change the email"})
    }
    entries.email=email


    if(!isvalidMobile.test(mobile)){
        return res.status(400).send({status:false,msg:"invalid mobile number type"})
    }
    const mobileNumberCheck=await internModel.findOne({mobile:mobile})
    if(mobileNumberCheck){
        return res.status(400).send(({status:false,msg:"mobile number already in use"}))
    }
    entries.mobile=mobile


    if(!stringChecking(collegeName)){
return res.status(400).send({status:false,msg:"input contains non string type"})
    }
    const college=await collegeModel.findOne({name:collegeName})
    if(!college){
        return res.status(404).send({status:false,msg:"college name not found"})
    }
    entries.collegeId=college._id


    const createData=await internModel.create(entries)
    return res.status(201).send({status:true,data:createData})

    }
catch(err){
    return res.status(500).send({status:false,msg:err.message})
}

}


const getIntern=async function(req,res){
    try{
    const data=req.query
   if(data.collegeName && Object.keys(data).length === 1){
        const collegeCheck=await collegeModel.findOne({name:data.collegeName.toLowerCase()})
    if(!collegeCheck){
        return res.status(404).send({status:false,msg:"college not found"})
    }
       //for(i=0;i<collegeCheck.length;i++){
    //   if(collegeCheck[i].isDeleted==true){
    //     return res.status(404).send({status:false,msg:"result not found"})
    // }
//}
    const {name,fullName,logoLink}=collegeCheck
    const internsList=await internModel.find({collegeId:collegeCheck._id}).select({name:1,email:1,mobile:1})
    if(internsList.length===0){
        return res.status(400).send({status:false,msg:"no interns found"})
    }
    const finalData={name,fullName,logoLink,internsList}
    return res.status(200).send({status:true,data:finalData})
    }
    return res.status(400).send({status:false,msg:"provide valid filter i.e collegeName"})    
}
    catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }
}


module.exports.createIntern=createIntern
module.exports.getIntern=getIntern