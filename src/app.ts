import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { adminRoutes } from './app/modules/Admin/admin.routes';
import { userRoutes } from './app/modules/User/user.routes';
import { allRouter } from './app/modules/router';
import GlobalErrorHandler from './app/middlewares/GlobalErrorHandler';


const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.get('/', (req: Request, res: Response) => {
    res.send('Kela Mela shara bela!')
})

app.use('/api/v1', allRouter)



app.use(GlobalErrorHandler)
app.use((req: Request, res: Response, next: NextFunction) => {
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
)
export default app