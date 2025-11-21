import { Response } from "express";
import { envVariable } from "../config/env.config";

export interface AuthTokens {
    accessToken?: string;
    refreshToken?: string;
}

export const setAuthCookie = (res: Response, tokenInfo: any) => {
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("accessToken", tokenInfo.accessToken, {
        httpOnly: true,
        secure: isProduction,          // 🔥 REQUIRED on Vercel
        sameSite: isProduction ? "none" : "lax", // 🔥 REQUIRED on Vercel
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", tokenInfo.refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};