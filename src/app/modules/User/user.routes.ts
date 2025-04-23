import { Router } from "express";
import { userController } from "./user.controller";
import Auth from "../../middlewares/Auth";
import { userRole } from "../../../../generated/prisma";

const router = Router()

// router.get('/', userController.createAdmin)
router.post('/',Auth(userRole.SUPER_ADMIN,userRole.ADMIN), userController.createAdmin)

export const userRoutes = router;