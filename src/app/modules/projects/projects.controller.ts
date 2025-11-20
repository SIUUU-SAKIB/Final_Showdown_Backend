import { NextFunction, Request, Response } from "express";
import { projectService } from "./projects.service";


const createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blog = await projectService.createProject(req.body)
        res.status(200).json({
            status: true,
            message: "🎉🎉🎉 Project created successfully",
            blog
        })
    } catch (error: any) { console.log("Error while creating blog", error.message) }
}


const getAllProjects = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string);

        const projects = await projectService.getAllBProject(page, limit);

        res.status(200).json({
            status: true,
            message: "Successfully fetched all the Project 🎉",
            data: projects
        })
    } catch (error) {
        console.log("Error fetching projects" + error)
    }
}

const updateProject = async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const response = await projectService.updateProject(payload, id)
    res.status(200).json({
        status: true,
        message: "Succssfully updated the Project 😍",
        data: response
    })
}

const getProjectById = async (req: Request, res: Response, next: NextFunction
) => {
    const { id } = req.params
    const result = await projectService.getProjectById(id)
    res.status(200).json({
        status: true,
        message: "Succssfully fetched the Project '🎉",
        data: result
    })
}
const deleteProjectById = async (req: Request, res: Response, next: NextFunction
) => {
    const result = await projectService.deleteProjectById(req.params.id)
    res.status(200).json({
        status: true,
        message: "Succssfully deleted the project ❌",
        data: result
    })
}
export const projectController = { getProjectById, createProject, getAllProjects, updateProject, deleteProjectById }