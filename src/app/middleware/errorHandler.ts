import { NextFunction, Request, Response } from "express";

const errorHandler = (err: { message: any; statusCode: any; }, req: Request, res: Response, next: NextFunction) => {
    console.error(`🔥🔥Error: ${err.message} `)
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    })
}

export default errorHandler