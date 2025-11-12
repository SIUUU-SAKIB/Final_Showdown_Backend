import { NextFunction, Request, Response } from "express";
import { blogService } from "./blogs.service";

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blog = await blogService.createBlog(req.body)
        res.status(200).json({
            status: true,
            message: "🎉🎉🎉 Blog created successfully",
            blog
        })
    } catch (error: any) { console.log("Error while creating blog", error.message) }
}


const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string);

        const blogs = await blogService.getAllBlogs(page, limit);

        res.status(200).json({
            status: true,
            message: "Successfully fetched all the blogs",
            data: blogs
        })
    } catch (error) {
        console.log("Error fetching blogs" + error)
    }
}

const updateBlog = async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const response = await blogService.updateBlog(payload, id)
    res.status(200).json({
        status: true,
        message: "Succssfully updated the blog",
        data: response
    })
}

const getBlogById = async (req: Request, res: Response, next:NextFunction
)=> {
    const {id} = req.params
    const result = await blogService.getBlogById(id)
    res.status(200).json({
        status: true,
        message: "Succssfully fetched the blog",
        data: result
    })
}
const deleteBlogById = async (req: Request, res: Response, next:NextFunction
)=>{
    const result = await blogService.deleteBlogById(req.params.id)
    res.status(200).json({
        status: true,
        message: "Succssfully deletd the blog",
        data: result
    })
}
export const blogController = {getBlogById, createBlog, getAllBlogs, updateBlog, deleteBlogById }