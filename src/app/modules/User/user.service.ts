// import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { PrismaClient, userRole } from "../../../../generated/prisma";

const prisma = new PrismaClient()

const createAdmin = async (payload) => {

    const hashedPassword = await bcrypt.hashSync(payload.password, 12);

    const userData = {
        email: payload.admin.email,
        password: hashedPassword,
        role: userRole.ADMIN
    }
    const result = await prisma.$transaction(async (TransactionClient) => {
        const user = await TransactionClient.user.create({
            data: userData
        })
        const admin = await TransactionClient.admin.create({
            data: payload.admin
        })
        return admin
    })
    return result
}
export const userService = {
    createAdmin,
}