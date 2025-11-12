import jwt, { JsonWebTokenError, SignOptions } from "jsonwebtoken"
import { envVariable } from "../config/env.config";
import { User } from "../modules/user/user.interface";


export const generateToken = (payload: Partial<User>, expiresIn: string) => {
    return jwt.sign(payload, envVariable.JWT_SECRET, { expiresIn } as SignOptions)
}


export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, envVariable.JWT_SECRET)
    } catch (error: any) {
        console.log(`JWT verification failed ${error.message}`)
        return null
    }
}