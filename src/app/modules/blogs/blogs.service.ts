import { BlogPost, BlogsModel } from "./blogs.interface";

const createBlog = async (payload: Partial<BlogPost>) => {

    const blog = await BlogsModel.create({
        ...payload
    })
    return blog
}

const updateBlog = async (payload: Partial<BlogPost>, id: string) => {
    const updateBlog = await BlogsModel.findByIdAndUpdate(id, { $set: payload },
        { new: true, runValidators: true }
    )
    if (!updateBlog) {
        throw Error("Blog not found")
    }
    return updateBlog
}

const getAllBlogs = async (page: number, limit: number) => {
    const skip = (page - 1) * limit
    console.log(skip)
    const blogs = await BlogsModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)

    return blogs
}

const getBlogById = async(id:string) => {
    const blog = await BlogsModel.findById(id)
    if(!blog){
        return new Error("Blog did not found")
    }
    return blog
}


const deleteBlogById = async(id:string) => {
    const blog = await BlogsModel.findByIdAndDelete(id)
    return blog
}

export const blogService = { createBlog, getAllBlogs, updateBlog, getBlogById, deleteBlogById }