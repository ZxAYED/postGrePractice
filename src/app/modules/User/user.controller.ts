import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../utils/CatchAsync";
import refineQuery from "../../utils/RefineQuery";
import { userFilterableFields } from "./user.constant";

const createAdmin =catchAsync(async (req: Request, res: Response,next:NextFunction) => {
    const result = await userService.createAdmin(req)
    res.status(200).json({
        success: true,
        message: "Admin Created Successfully",
        data: result
    })
})

const createDoctor =catchAsync(async (req: Request, res: Response,next:NextFunction) => {
    const result = await userService.createDoctor(req)
    res.status(200).json({
        success: true,
        message: "Doctor Created Successfully",
        data: result
    })
})
const createPatient =catchAsync(async (req: Request, res: Response,next:NextFunction) => {
    const result = await userService.createPatient(req)
    res.status(200).json({
        success: true,
        message: "Patient Created Successfully",
        data: result
    })
})
const updateUser =catchAsync(async (req: Request, res: Response,next:NextFunction) => {
    const result = await userService.updateUser(req.params.id,req.body)
    res.status(200).json({
        success: true,
        message: "User status updated Successfully",
        data: result
    })
})
const getAllUsers = catchAsync (async(req: Request, res: Response,next:NextFunction) => {
   
    const Query = refineQuery(req.query, userFilterableFields)

    const options = refineQuery(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

    const result = await userService.getAllUsers(Query, options)
    res.status(200).json({
        success: true,
        message: "Users Fetched Successfully",
        data: { data: result.data, meta: result.meta }
    })

})




export const userController = {
    createAdmin,createDoctor,createPatient,getAllUsers,updateUser
}