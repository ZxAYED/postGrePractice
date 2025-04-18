import { Admin } from './../../../../generated/prisma/index.d';


import { Prisma, PrismaClient, UserStatus } from "../../../../generated/prisma";
import caclucatePagination from "../../utils/Pagination";
import { adminFilterableFields } from "./admin.constant";

const prisma = new PrismaClient();





const getAllAdmins = async (params: any,options:any) => {


    const { searchTerm ,...filteredData } = params
    const { page, limit, skip, sortBy, sortOrder } = caclucatePagination(options)
    const andConditions: Prisma.AdminWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: adminFilterableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    };
    andConditions.push({
        isDeleted: false
    })
    

    if (Object.keys(filteredData).length > 0) {
        andConditions.push({
            AND: Object.keys(filteredData).map(key => ({
                [key]: {
                    equals: filteredData[key]
                }
            }))
        })
    }
  
    const whereCondition:Prisma.AdminWhereInput = {AND: andConditions}

    const result = await prisma.admin.findMany({
        where: whereCondition,
        skip,
        take: limit ,
        orderBy: {
            [sortBy]: sortOrder as Prisma.SortOrder,}
    }) 
const total = await prisma.admin.count({    
    where: whereCondition
})

    return {
       meta:{
        page, limit,total
       },
       data:result
    }
}

const getSingleAdmin = async (id: string):Promise<Admin | null> => {
const result = await prisma.admin.findUniqueOrThrow({
    where: {  id },
})
return result

}
const deleteAdmin = async (id: string):Promise<Admin | null> => {

 await prisma.admin.findUniqueOrThrow({
    where: {  id },})

    const result = await prisma.$transaction(async (transecClient) => {
        const deleteAdmin = await transecClient.admin.delete({
            where: { id }})
        
       await transecClient.user.delete({
            where:{
                email:deleteAdmin.email
            }
        })
        return deleteAdmin
        })
return result

}
const softDeleteAdmin = async (id: string) :Promise<Admin | null>=> {

 await prisma.admin.findUniqueOrThrow({
    where: {  id },})

    const result = await prisma.$transaction(async (transecClient) => {
        const deleteAdmin = await transecClient.admin.update({
            where: { id },
            data:{
                isDeleted:true
            }
        
        })
        
       await transecClient.user.update({
            where:{
                email:deleteAdmin.email
            },
            data:{
                status:UserStatus.DELETED
            }
        })
        return deleteAdmin
        })
return result

}

const updateAdmin = async (id: string, data: Prisma.AdminUpdateInput):Promise<Admin | null> => {
    await prisma.admin.findUniqueOrThrow({
        where: { id },
    })

    const result = await prisma.admin.update({
        where: { id },
        data: data,  
    })
    return result

}
export const adminService = { getAllAdmins,getSingleAdmin ,updateAdmin,deleteAdmin ,softDeleteAdmin}