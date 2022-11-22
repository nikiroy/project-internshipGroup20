const stringChecking=function(data){
    if(typeof data!=='string'){
        return false;
    }else if(typeof data=="string"&&data.length==0){
        return false
    }else {
        return true
    }
}


const isvalidEmail=/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
const isvalidMobile=/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/
const isValidName=/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/
const isvalidlogolink=/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/

module.exports={stringChecking,isvalidEmail,isvalidMobile,isValidName,isvalidlogolink}
