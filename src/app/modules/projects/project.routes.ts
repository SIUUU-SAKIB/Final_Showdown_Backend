import { Router } from "express";
import { projectController } from "./projects.controller";


const router = Router()
router.post('/create-project', projectController.createProject )

router.patch("/update-project/:id",projectController.updateProject )
router.get('/all-projects', projectController.getAllProjects)

router.get("/project/:id", projectController.getProjectById)

router.delete("/delete-project/:id", projectController.deleteProjectById)

export const projectsRoute = router