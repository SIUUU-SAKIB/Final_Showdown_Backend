import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/JWT";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader.startsWith("Bearer")) {
        return res.status(401).json({
            message: "Authorization token missing"
        })
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = verifyToken(token)
    if (!decodedToken) {
        return res.status(401).json({ message: "Invaild or missing token" })

    }
    req.user = decodedToken
    next()
}