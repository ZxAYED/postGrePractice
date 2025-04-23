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

const changePassword = catchAsync(async (req: Request, res: Response) => {

    const result = await authService.changePassword(req.user,req.body)
    
    res.status(200).json({
        success: true,
        message: "Password changed successfully",
        data: result,
    })
})

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.forgotPassword(req.body.email)
    res.status(200).json({
        success: true,
        message: "Password reset link sent to your email",
        data: result,
    })

})
const resetPassword = catchAsync(async (req: Request, res: Response) => {

    const result = await authService.resetPassword(req.headers.authorization!,req.body)
    res.status(200).json({
        success: true,
        message: "Password reset successfully",
        data: result,
    })
})
export const authController = { loginUser, refreshToken,changePassword,forgotPassword ,resetPassword}
