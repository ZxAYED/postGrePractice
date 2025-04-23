import  jwt, { JwtPayload }  from 'jsonwebtoken';
import { NextFunction, Request, Response, Router } from "express";
import { authController } from "./auth.controller";
import Auth from '../../middlewares/Auth';
import { userRole } from '../../../../generated/prisma';


const router = Router()


router.post('/login',authController.loginUser)

router.post('/refresh-token',Auth(userRole.SUPER_ADMIN,userRole.ADMIN,userRole.DOCTOR,    userRole.PATIENT),authController.refreshToken)

router.post('/change-password',Auth(userRole.SUPER_ADMIN,userRole.ADMIN,userRole.DOCTOR,    userRole.PATIENT),authController.changePassword)

router.post('/forgot-password',Auth(userRole.SUPER_ADMIN,userRole.ADMIN,userRole.DOCTOR,    userRole.PATIENT),authController.forgotPassword)

router.post('/reset-password',Auth(userRole.SUPER_ADMIN,userRole.ADMIN,userRole.DOCTOR,    userRole.PATIENT),authController.resetPassword)

export const authRoutes = router
