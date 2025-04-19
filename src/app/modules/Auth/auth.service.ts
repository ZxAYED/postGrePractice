import { PrismaClient, UserStatus } from "../../../../generated/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();




const loginUser =async(payload:any)=>{
    const {email,password} = payload
    const user = await prisma.user.findUniqueOrThrow({
        where:{
            email
        }
    })
    if(!user){
        throw new Error("User not found")
    }
    const isPasswordMatch =await bcrypt.compare(password, user.password)
    if(!isPasswordMatch){
        throw new Error("Password is incorrect")
    }

const accessToken = jwt.sign({
    email: user.email,
    password:payload.password,
    role: user.role,
  }, process.env.JWT_SECRET_KEY!, { expiresIn: Number(process.env.JWT_EXPIRES_IN) });


const refreshToken = jwt.sign({
    email: user.email,
    password:payload.password,
    role: user.role,
  }, process.env.JWT_SECRET_KEY!, { expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRES_IN) });




    return {
        accessToken,
        refreshToken,
        needPasswordChange: user.needPasswordChange,
    }
}
const refreshToken =async(token:string)=>{
    let decodedToken
try{
     decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!)

}
catch(err){
    throw new Error("Invalid refresh token")
}
const isUserExist = await prisma.user.findUnique({
    where:{
        email:(decodedToken as any).email,
        status:UserStatus.ACTIVE
    } })
    if(!isUserExist){
        throw new Error("User not found")
    }
    const accessToken = jwt.sign({
        email: (decodedToken as any).email,
        password:(decodedToken as any).password,
        role: (decodedToken as any).role,
      }, process.env.JWT_SECRET_KEY!, { expiresIn: Number(process.env.JWT_EXPIRES_IN) });


     


      return {
        accessToken
       
      }
}
export const authService = { loginUser,refreshToken }