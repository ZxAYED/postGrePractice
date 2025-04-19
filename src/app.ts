import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { adminRoutes } from './app/modules/Admin/admin.routes';
import { userRoutes } from './app/modules/User/user.routes';
import { allRouter } from './app/modules/router';
import GlobalErrorHandler from './app/middlewares/GlobalErrorHandler';
import NotFound from './app/middlewares/NotFound';
import cookieParser from 'cookie-parser';

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())


app.get('/', (req: Request, res: Response) => {
    res.send('Kela Mela shara bela!')
})

app.use('/api/v1', allRouter)



app.use(GlobalErrorHandler)
app.use(NotFound)
export default app