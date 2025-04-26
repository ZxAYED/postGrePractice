import nodemailer from "nodemailer";
import config from "../config";

const EmailSender = async (email: string,html:string) => { 

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: config.appEmail, 
      pass: config.appPassword,
    },
    
      tls:{
        rejectUnauthorized: false
      }
    
  });

    const info = await transporter.sendMail({
      from:`"Ph-HealthCare <${config.appEmail}>"`, 
      subject: "Reset Password Link ", 
      to: email,
      text: "Hello , this is your reset password link from Ph-HealthCare.It will expire in 1 hour", 
      html:html, 
    });
  
    console.log("Message sent: %s", info.messageId);
    
 

}
export default EmailSender;