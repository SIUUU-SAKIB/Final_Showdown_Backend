import { NextFunction, Request, Response } from "express";
import { uesrservice } from "./user.service";
import { setAuthCookie } from "../../utils/setCookie";
import { it } from "zod/v4/locales";
import { verifyToken } from "../../utils/JWT";
import { UserModel } from "./user.interface";
import { envVariable } from "../../config/env.config";

const createUser = async (req: Request, res: Response) => {
    const paylaod = await req.body;
    const user = await uesrservice.createUser(paylaod)
    res.status(200).json({
        status: true,
        message: "User created successfully",
        data: user
    })
}

const login = async (req: Request, res: Response) => {
    const user = await uesrservice.login(req.body)
    setAuthCookie(res, user)
    res.status(200).json({
        status: true,
        message: "🎉🎉🎉 Login Successfull",
        user
    })
}


const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const token = req.cookies?.accessToken;
        if (!token) {
            return res.status(401).json({ message: "No token found" })
        }

        const decoded = verifyToken(token)
        const user = await UserModel.findById((decoded as any).userId)

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user });
    } catch (error) {
        res.status(401).json({
            message: "Invalid Token"
        })
    }
}

const logoutUser = async(req:Request, res:Response,next:NextFunction) => {
    try{
       res.clearCookie("accessToken", {
        httpOnly:true,
        secure:envVariable.NODE_ENV === "production",
        sameSite:"strict"
       })
       res.status(200).json({
        message:"User Logged out successfully"
       })
    }catch(error){
   console.error(error);
    res.status(500).json({ message: "Server error while logging out" });
    }
}


export const userController = { createUser, login, getCurrentUser, logoutUser }