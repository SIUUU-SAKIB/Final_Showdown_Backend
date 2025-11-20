import ProjectModel, { IProject } from "./projects.interface"

const createProject = async (payload: Partial<IProject>) => {

    const blog = await ProjectModel.create({
        ...payload
    })
    return blog
}

const updateProject = async (payload: Partial<IProject>, id: string) => {
    const updateProject = await ProjectModel.findByIdAndUpdate(id, { $set: payload },
        { new: true, runValidators: true }
    )
    if (!updateProject) {
        throw Error("project not found")
    }
    return updateProject
}

const getAllBProject = async (page: number, limit: number) => {
    const skip = (page - 1) * limit
    console.log(skip)
    const blogs = await ProjectModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)

    return blogs
}

const getProjectById = async (id: string) => {
    const blog = await ProjectModel.findById(id)
    if (!blog) {
        return new Error("Blog did not found")
    }
    return blog
}


const deleteProjectById = async (id: string) => {
    const blog = await ProjectModel.findByIdAndDelete(id)
    return blog
}

export const projectService= {createProject, updateProject, deleteProjectById, getAllBProject, getProjectById}