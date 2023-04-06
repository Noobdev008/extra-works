const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"",
        pass:""
    }
});

var mailOption = {
    from:'',
    to :'',
    subject:"",
    text:""
};

transport.sendMail(mailOption,(err,result)=>{
if(err){
    console.log("Error sending email "+err);
}else{
    console.log("Sent email successfully");
}
});
//7355305504
