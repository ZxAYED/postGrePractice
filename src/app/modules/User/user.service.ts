// import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Prisma, PrismaClient, userRole, UserStatus } from "../../../../generated/prisma";
import UploadToCloudinary from "../../utils/Cloudinary";
import caclucatePagination from "../../utils/Pagination";
import { userSearchableFields } from "./user.constant";
import { IAuthUser } from "../../types";
import { Request } from "express";

const prisma = new PrismaClient()

const createAdmin = async (req:any) => {



    if(req.file){
        const uploadToCloudinary = await UploadToCloudinary(req.file)
 
   
       
    }
    const hashedPassword = await bcrypt.hashSync(req.body.password, 12);

    const userData = {
        email: req.body.admin.email,
        password: hashedPassword,
        role: userRole.ADMIN,
        profilePhoto: req.body.admin.profilePhoto
    }
    const result = await prisma.$transaction(async (TransactionClient) => {
        const user = await TransactionClient.user.create({
            data: userData
        })
        const admin = await TransactionClient.admin.create({
            data: req.body.admin
        })
        return admin
    })
    return result
}
const createDoctor = async (req:any) => {



    if(req.file){
        const uploadToCloudinary = await UploadToCloudinary(req.file)
  
    
        
        req.body.doctor.profilePhoto = uploadToCloudinary?.originalUrl 
    }
    const hashedPassword = await bcrypt.hashSync(req.body.password, 12);

    const userData = {
        email: req.body.doctor.email,
        password: hashedPassword,
        role: userRole.DOCTOR
    }
    const result = await prisma.$transaction(async (TransactionClient) => {
        const user = await TransactionClient.user.create({
            data: userData
        })
        const doctor = await TransactionClient.doctor.create({
            data: req.body.doctor
        })
        return doctor
    })
    return result
}
const createPatient = async (req:any) => {



    if(req.file){
        const uploadToCloudinary = await UploadToCloudinary(req.file)
  
    
        
        req.body.patient.profilePhoto = uploadToCloudinary?.originalUrl 
    }
    const hashedPassword = await bcrypt.hashSync(req.body.password, 12);

    const userData = {
        email: req.body.patient.email,
        password: hashedPassword,
        role: userRole.PATIENT
    }
    const result = await prisma.$transaction(async (TransactionClient) => {
        const user = await TransactionClient.user.create({
            data: userData
        })
        const patient = await TransactionClient.patient.create({
            data: req.body.patient
        })
        return patient
    })
    return result
}
const updateUser =async(id:string,data:any)=>{
   await prisma.user.findUniqueOrThrow({
       where:{id}
   })

   const result = await prisma.user.update({    
    where:{id},
    data:{
        status:data.status
    }
   })
   return result
}
const getAllUsers = async (params: any,options:any) => {


    const { searchTerm ,...filteredData } = params
    const { page, limit, skip, sortBy, sortOrder } = caclucatePagination(options)
    const andConditions: Prisma.UserWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: userSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    };
   
    

    if (Object.keys(filteredData).length > 0) {
        andConditions.push({
            AND: Object.keys(filteredData).map(key => ({
                [key]: {
                    equals: filteredData[key]
                }
            }))
        })
    }
  
    const whereCondition:Prisma.UserWhereInput = {AND: andConditions}

    const result = await prisma.user.findMany({
        where: whereCondition,
        skip,
        take: limit ,
        orderBy: {
            [sortBy]: sortOrder as Prisma.SortOrder,},
            // select:{
            //     id:true,
            //     email:true,
            //     role:true,
            //     createdAt:true,
            //     updatedAt:true,
            //     status:true,
            //     needPasswordChange:true

                
            // },
            include:{
                doctor:{
                    select:{
                        id:true,
                        name:true,
                        profilePhoto:true
                    }
                },
                admin:{ 
                    select:{
                        id:true,
                        name:true,
                        profilePhoto:true
                    }
                },
                patient:{
                    select:{
                        id:true,
                        name:true,
                        profilePhoto:true
                    }
                }
            }
    }) 
const total = await prisma.user.count({    
    where: whereCondition
})

    return {
       meta:{
        page, limit,total
       },
       data:result
    }
}
const changeProfileStatus = async (id: string, status: userRole) => {
     await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    });

    const updateUserStatus = await prisma.user.update({
        where: {
            id
        },
        data: status
    });

    return updateUserStatus;
};

const getMyProfile = async (user: IAuthUser) => {

    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user?.email,
            status: UserStatus.ACTIVE
        },
        select: {
            id: true,
            email: true,
            needPasswordChange: true,
            role: true,
            status: true
        }
    });

    let profileInfo;

    if (userInfo.role === userRole.SUPER_ADMIN) {
        profileInfo = await prisma.admin.findUnique({
            where: {
                email: userInfo.email
            }
        })
    }
    else if (userInfo.role === userRole.ADMIN) {
        profileInfo = await prisma.admin.findUnique({
            where: {
                email: userInfo.email
            }
        })
    }
    else if (userInfo.role === userRole.DOCTOR) {
        profileInfo = await prisma.doctor.findUnique({
            where: {
                email: userInfo.email
            }
        })
    }
    else if (userInfo.role === userRole.PATIENT) {
        profileInfo = await prisma.patient.findUnique({
            where: {
                email: userInfo.email
            }
        })
    }

    return { ...userInfo, ...profileInfo };
};


const updateMyProfie = async (user: IAuthUser, req: Request) => {
    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user?.email,
            status: UserStatus.ACTIVE
        }
    });

    const file = req.file as Express.Multer.File;
    if (file) {
        const uploadToCloudinary = await UploadToCloudinary(file);
        req.body.profilePhoto = uploadToCloudinary?.originalUrl;
    }

    let profileInfo;

    if (userInfo.role === userRole.SUPER_ADMIN) {
        profileInfo = await prisma.admin.update({
            where: {
                email: userInfo.email
            },
            data: req.body
        })
    }
    else if (userInfo.role === userRole.ADMIN) {
        profileInfo = await prisma.admin.update({
            where: {
                email: userInfo.email
            },
            data: req.body
        })
    }
    else if (userInfo.role === userRole.DOCTOR) {
        profileInfo = await prisma.doctor.update({
            where: {
                email: userInfo.email
            },
            data: req.body
        })
    }
    else if (userInfo.role === userRole.PATIENT) {
        profileInfo = await prisma.patient.update({
            where: {
                email: userInfo.email
            },
            data: req.body
        })
    }

    return { ...profileInfo };
}


export const userService = {
    createAdmin,createDoctor,createPatient,getAllUsers,updateUser,changeProfileStatus,
    getMyProfile,
    updateMyProfie
}