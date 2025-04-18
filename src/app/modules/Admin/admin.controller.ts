import { NextFunction, Request, Response } from "express"
import { adminService } from "./admin.service"
import RefineQuery from "../../utils/RefineQuery"
import { adminFilterableFields } from "./admin.constant"
import catchAsync from "../../utils/CatchAsync"




const getAllAdmins = catchAsync (async(req: Request, res: Response,next:NextFunction) => {
   
        const Query = RefineQuery(req.query, adminFilterableFields)

        const options = RefineQuery(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

        const result = await adminService.getAllAdmins(Query, options)
        res.status(200).json({
            success: true,
            message: "Admins Fetched Successfully",
            data: { data: result.data, meta: result.meta }
        })
    
})
const deleteAdmin = catchAsync (async (req: Request, res: Response,next:NextFunction) => {
  
        const result = await adminService.deleteAdmin(req.params.id)

        res.status(200).json({
            success: true,
            message: "Admin deleted Successfully",
            data: result
        })
    }
   
)
const getSingleAdmin = catchAsync (async (req: Request, res: Response,next:NextFunction) => {

        const result = await adminService.getSingleAdmin(req.params.id)

        res.status(200).json({
            success: true,
            message: "Admin Fetched Successfully",
            data: result
        })
 
})
const updateAdmin = catchAsync (async (req: Request, res: Response,next:NextFunction) => {
  
        const result = await adminService.updateAdmin(req.params.id,req.body)

        res.status(200).json({
            success: true,
            message: "Admin Fetched Successfully",
            data: result
        })
   
})
const softDeleteAdmin = catchAsync (async (req: Request, res: Response,next:NextFunction) => {
   
        const result = await adminService.softDeleteAdmin(req.params.id)

        res.status(200).json({
            success: true,
            message: "Admin deleted Successfully",
            data: result
        })
   
})

export const adminController = { deleteAdmin,getAllAdmins, getSingleAdmin,updateAdmin,softDeleteAdmin }