import { NextFunction, Request, Response } from "express"

const GlobalErrorHandler = (err:any , req: Request, res:Response, next:NextFunction) => {
  
        res.status(500).json({
            success: false,
            message: err.message||err.name || 'Internal Server Error'  ,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
            error:err
        })
    }

export default GlobalErrorHandler