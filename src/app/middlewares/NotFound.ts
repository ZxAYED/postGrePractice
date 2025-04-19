import { NextFunction, Request, Response } from "express"

const NotFound =async  (req: Request, res: Response, next: NextFunction) => { 
   
        res.status(404).json({      
            success: false,
            message: 'Route not found',
            error: {
                path: req.originalUrl,
                method: req.method,
                message: 'Path not found',
                stack: process.env.NODE_ENV === 'development' ? 'Route not found' : undefined,
            }
        })
        
    }

export default NotFound