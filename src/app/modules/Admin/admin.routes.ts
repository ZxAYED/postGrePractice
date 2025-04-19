import { Router } from "express";
import { adminController } from "./admin.controller";
import ValidateRequest from "../../utils/ValidateRequest";
import { adminValidation } from "./admin.validation";

const router = Router()

router.get('/', adminController.getAllAdmins)
router.get('/:id', adminController.getSingleAdmin)
router.patch('/:id',ValidateRequest(adminValidation.updateValidation), adminController.updateAdmin)
router.delete('/:id', adminController.deleteAdmin)
router.patch('/soft/:id', adminController.softDeleteAdmin)


export const adminRoutes = router