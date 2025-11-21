"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = void 0;
const setAuthCookie = (res, tokenInfo) => {
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("accessToken", tokenInfo.accessToken, {
        httpOnly: true,
        secure: isProduction, // 🔥 REQUIRED on Vercel
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
exports.setAuthCookie = setAuthCookie;
