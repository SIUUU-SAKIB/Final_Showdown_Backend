import express, { Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import compression from "compression"
import errorHandler from "./app/middleware/errorHandler"
import { notFoundHandler } from "./app/middleware/notFound"
import { userRoutes } from "./app/modules/user/user.routes"
import { blogsRoute } from "./app/modules/blogs/blogs.routes"
const app = express()

// MIDDLEWARES
app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(cookieParser())
app.use(compression())
app.use(errorHandler)


// MAIN ROUTES
app.use('/api/v1/', userRoutes)
app.use('/api/v1/', blogsRoute)

// DEFAULT ROUTE
app.get(`/`, (req: Request, res: Response) => {
    res.status(200).json({
        message: "WELCOME TO PERSONAL PORTFOLIO BACKEND"
    })
})
app.use(notFoundHandler)
export default app;