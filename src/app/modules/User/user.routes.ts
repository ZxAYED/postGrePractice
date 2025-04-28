import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import Auth from "../../middlewares/Auth";
import { userRole } from "../../../../generated/prisma";
import MulterUpload from "../../utils/Multer";
import ValidateRequest from "../../utils/ValidateRequest";
import { userValidation } from "./userValidation";

const router = Router()


router.post('/create-admin',MulterUpload.single('profilePhoto'),Auth(userRole.SUPER_ADMIN,userRole.ADMIN), 
(req:Request ,res:Response ,next:NextFunction) => {
    
    const ParsedData =JSON.parse(req.body.data)
    req.body=userValidation.createAdminValidation.parse(ParsedData)
   return userController.createAdmin(req,res,next)
   
}
)
router.post('/create-doctor',MulterUpload.single('profilePhoto'),Auth(userRole.SUPER_ADMIN,userRole.ADMIN), 
(req:Request ,res:Response ,next:NextFunction) => {
    
    const ParsedData =JSON.parse(req.body.data)
    req.body=userValidation.createDoctorValidation.parse(ParsedData)
   return userController.createDoctor(req,res,next)
   
}
)
router.post('/create-patient',MulterUpload.single('profilePhoto'),
(req:Request ,res:Response ,next:NextFunction) => {
    
    const ParsedData =JSON.parse(req.body.data)

    req.body=userValidation.createPatientValidation.parse(ParsedData)
   
   return userController.createPatient(req,res,next)
   
}
)
router.get('/',Auth(userRole.SUPER_ADMIN,userRole.ADMIN),userController.getAllUsers)

router.patch('/:id',Auth(userRole.SUPER_ADMIN,userRole.ADMIN),ValidateRequest(userValidation.updateUserStatusValidation),userController.updateUser)

router.get(
    '/me',
    Auth(userRole.SUPER_ADMIN, userRole.ADMIN, userRole.DOCTOR, userRole.PATIENT),
    userController.getMyProfile
)
router.patch(
    '/:id/status',
    Auth(userRole.SUPER_ADMIN, userRole.ADMIN),
    ValidateRequest(userValidation.updateUserStatusValidation),
    userController.changeProfileStatus
);

router.patch(
    "/update-my-profile",
    Auth(userRole.SUPER_ADMIN, userRole.ADMIN, userRole.DOCTOR, userRole.PATIENT),
    MulterUpload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        return userController.updateMyProfie(req, res, next)
    }
);
export const userRoutes = router;