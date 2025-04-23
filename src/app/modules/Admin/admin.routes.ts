import { Router } from "express";
import { adminController } from "./admin.controller";
import ValidateRequest from "../../utils/ValidateRequest";
import { adminValidation } from "./admin.validation";
import Auth from "../../middlewares/Auth";
import { userRole } from "../../../../generated/prisma";

const router = Router()

router.get('/',Auth(userRole.SUPER_ADMIN,userRole.ADMIN), adminController.getAllAdmins)
router.get('/:id',Auth(userRole.SUPER_ADMIN,userRole.ADMIN), adminController.getSingleAdmin)
router.patch('/:id',Auth(userRole.SUPER_ADMIN,userRole.ADMIN),ValidateRequest(adminValidation.updateValidation), adminController.updateAdmin)
router.delete('/:id',Auth(userRole.SUPER_ADMIN,userRole.ADMIN), adminController.deleteAdmin)
router.patch('/soft/:id',Auth(userRole.SUPER_ADMIN,userRole.ADMIN), adminController.softDeleteAdmin)


export const adminRoutes = router