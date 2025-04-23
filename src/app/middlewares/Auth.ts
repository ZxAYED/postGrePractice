import  jwt, { JwtPayload }  from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express"
import config from "../config"
import AppError from '../errors/AppError';

import { DecodedToken } from '../types';



const Auth=(...roles:string[])=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
try{
const token = req.headers.authorization

if(!token) throw new AppError(401,'You are not authorized')



const decodedToken = await jwt.verify(
    token as string, 
    config.jwt.jwt_access_secret_key as string
) as DecodedToken;

// if( !roles.hasOwnProperty(decodedToken.role)){
//     throw new Error('You are not authorized')

    req.user = decodedToken;


if(roles.length && !roles.includes(decodedToken.role)){
    throw new AppError(401,'You are not authorized')
}
    

    req.user= decodedToken  
    next()
}
catch(err){
    next(err)
}
      
}}

export default Auth