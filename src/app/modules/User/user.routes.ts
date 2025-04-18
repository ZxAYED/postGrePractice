import { Router } from "express";
import { userController } from "./user.controller";

const router = Router()

// router.get('/', userController.createAdmin)
router.post('/', userController.createAdmin)

export const userRoutes = router;