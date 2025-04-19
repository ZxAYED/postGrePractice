import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"
import catchAsync from "./CatchAsync"

const ValidateRequest = (schema: AnyZodObject) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync(req.body)
    
   next()
})
export default ValidateRequest                      