import { Request, Response } from "express";
import catchAsync from "../../utils/CatchAsync";
import { doctorFilterableFields } from "./doctor.constant";
import refineQuery from "../../utils/RefineQuery";
import { DoctorService } from "./doctor.services";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    
    const filters = refineQuery(req.query, doctorFilterableFields);
    const options = refineQuery(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await DoctorService.getAllFromDB(filters, options);
    res.status(200).json( {
       
        success: true,
        message: 'Doctors retrieval successfully',
        meta: result.meta,
        data: result.data,
    });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DoctorService.getByIdFromDB(id);
    res.status(200).json( {
       
        success: true,
        message: 'Doctor retrieval successfully',
        data: result,
    });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await DoctorService.updateIntoDB(id, req.body);

    res.status(200).json( {
       
        success: true,
        message: "Doctor data updated!",
        data: result
    })
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DoctorService.deleteFromDB(id);
    res.status(200).json( {
       
        success: true,
        message: 'Doctor deleted successfully',
        data: result,
    });
});


const softDelete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DoctorService.softDelete(id);
    res.status(200).json( {
       
        success: true,
        message: 'Doctor soft deleted successfully',
        data: result,
    });
});


export const DoctorController = {
    updateIntoDB,
    getAllFromDB,
    getByIdFromDB,
    deleteFromDB,
    softDelete
}