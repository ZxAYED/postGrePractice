import { z } from "zod";
import { UserStatus } from "../../../../generated/prisma";

const updateValidation=z.object({
 body:z.object({
    name:z.string().optional(),
    email:z.string().email().optional(),
    password:z.string().optional(),
    role:z.enum(["SUPER_ADMIN",
        "ADMIN",
        "DOCTOR",       
        "PATIENT"]).optional(),
        
    phoneNumber:z.string().optional(),
    address:z.string().optional(),
    profileImage:z.string().optional()
 })
})

export const adminValidation={
    updateValidation}