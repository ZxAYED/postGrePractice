import { PrismaClient, UserStatus } from "../../../../generated/prisma";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import EmailSender from "../../utils/EmailSender";
const prisma = new PrismaClient();




const loginUser =async(payload:any)=>{
    const {email,password} = payload
    const user = await prisma.user.findUniqueOrThrow({
        where:{
            email
        }
    })
    if(!user){
        throw new AppError(404,"User not found")
    }
    const isPasswordMatch =await bcrypt.compare(password, user.password)
    if(!isPasswordMatch){
        throw new AppError(400,"Password is incorrect")
    }

const accessToken = jwt.sign({
    email: user.email,
    password:payload.password,
    role: user.role,
  }, config.jwt.jwt_access_secret_key!, { expiresIn: Number(config.jwt.jwt_expires_in) });


const refreshToken = jwt.sign({

    email: user.email,
    password:payload.password,
    role: user.role,
  }, config.jwt.jwt_access_secret_key!, { expiresIn: Number(config.jwt.jwt_refresh_expires_in) });

    return {
        accessToken,
        refreshToken,
        needPasswordChange: user.needPasswordChange,
    }
}
const refreshToken =async(token:string)=>{
    let decodedToken
try{
     decodedToken = jwt.verify(token, config.jwt.jwt_access_secret_key!)

}
catch(err){
    throw new AppError(400,"Invalid refresh token")
}
const isUserExist = await prisma.user.findUnique({
    where:{
        email:(decodedToken as any).email,
        status:UserStatus.ACTIVE
    } })
    if(!isUserExist){
        throw new AppError(404,"User not found")
    }
    const accessToken = jwt.sign({
        email: (decodedToken as any).email,
        password:(decodedToken as any).password,
        role: (decodedToken as any).role,
      }, config.jwt.jwt_access_secret_key!, { expiresIn: Number(config.jwt.jwt_expires_in) });


     


      return {
        accessToken
       
      }
}

const changePassword =async(user:any,payload:any)=>{
const findUser = await prisma.user.findUniqueOrThrow({
    where:{
        email:user.email,
        status:UserStatus.ACTIVE
    }
})

if(!findUser){
    throw new AppError(404,"User not found")
}

const isPasswordMatch =await bcrypt.compare(payload.oldPassword, findUser.password)
    if(!isPasswordMatch){
        throw new AppError(400,"Password is incorrect")
    }
const hashedPassword = await bcrypt.hash(payload.newPassword, 10)
await prisma.user.update({      
    where:{
        email:user.email
    },
    data:{
        password:hashedPassword,
        needPasswordChange:false
    }
})
return {
    message:"Password changed successfully"
}
}

const forgotPassword =async(email:string)=>{ 

const findUser = await prisma.user.findUniqueOrThrow({
    where:{
        email,
        status:UserStatus.ACTIVE
    }
})
if(!findUser){
    throw new AppError(404,"User not found")

}

const resetToken = jwt.sign({
    email: findUser.email,
    role: findUser.role,
  }, config.jwt.jwt_access_secret_key!, { expiresIn: Number(config.forgot_password_token_expires_in) 
})

const resetLink = `${config.reset_password_link}?email=${findUser.email}&token=${resetToken}`



await EmailSender(findUser.email,`<div style="text-align: center">
<h1>Reset Password</h1>
<p>Hello ${findUser.email}</p>
<p>Click below link to reset your password</p>

<a href="${resetLink}"> <button>Click here </button></a>
</div>
`)
}
const resetPassword =async(token:string,payload:{id:string,password:string})=>{
const userData = await prisma.user.findUniqueOrThrow({
    where:{
        id:payload.id,
        status:UserStatus.ACTIVE
        
    }
})
const isValidToken = jwt.verify(token, config.jwt.jwt_access_secret_key as Secret)
if(!isValidToken){
    throw new AppError(400,"Invalid token")
}

const hashedPassword = await bcrypt.hash(payload.password, 10)
await prisma.user.update({
    where:{
        id:payload.id
    },
    data:{
        password:hashedPassword,
        needPasswordChange:false
    }
})

return { message:"Password reset successfully"}
}


export const authService = { loginUser,refreshToken ,changePassword,forgotPassword,resetPassword}