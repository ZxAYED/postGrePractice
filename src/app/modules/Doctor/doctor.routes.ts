import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { userRole } from "../../../../generated/prisma";
import Auth from "../../middlewares/Auth";
import ValidateRequest from "../../utils/ValidateRequest";
import { DoctorValidation } from "./doctor.validation";


const router = Router();


router.get('/', DoctorController.getAllFromDB);


router.get('/:id', DoctorController.getByIdFromDB);

router.patch(
    '/:id',
    Auth(userRole.SUPER_ADMIN, userRole.ADMIN, userRole.DOCTOR),
    ValidateRequest(DoctorValidation.update),
    DoctorController.updateIntoDB
);


router.delete(
    '/:id',
    Auth(userRole.SUPER_ADMIN, userRole.ADMIN),
    DoctorController.deleteFromDB
);


router.delete(
    '/soft/:id',
    Auth(userRole.SUPER_ADMIN, userRole.ADMIN),
    DoctorController.softDelete);

export const DoctorRoutes = router