import { Request, Response } from "express";
import catchAsync from "../../utils/CatchAsync";
import { authService } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.loginUser(req.body)

    const { refreshToken } = result

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })



    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: {
            accessToken: result.accessToken,
            needPasswordChange: result.needPasswordChange,

        },
    })
})


const refreshToken = catchAsync(async (req: Request, res: Response) => {

    const { refreshToken } = req.cookies
    if (!refreshToken) {
        throw new Error("Refresh token not found")
    }
 

    const result = await authService.refreshToken(refreshToken)
    
    res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        data: result,
    })
})




export const authController = { loginUser, refreshToken }
