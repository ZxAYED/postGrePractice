import { Router } from "express";
import { userRoutes } from "../User/user.routes";
import { adminRoutes } from "../Admin/admin.routes";
import { authRoutes } from "../Auth/auth.router";

const router = Router()


const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/admin',
        route: adminRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export const allRouter = router