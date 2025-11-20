"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectController = void 0;
const projects_service_1 = require("./projects.service");
const createProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield projects_service_1.projectService.createProject(req.body);
        res.status(200).json({
            status: true,
            message: "🎉🎉🎉 Project created successfully",
            blog
        });
    }
    catch (error) {
        console.log("Error while creating blog", error.message);
    }
});
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit);
        const projects = yield projects_service_1.projectService.getAllBProject(page, limit);
        res.status(200).json({
            status: true,
            message: "Successfully fetched all the Project 🎉",
            data: projects
        });
    }
    catch (error) {
        console.log("Error fetching projects" + error);
    }
});
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const payload = req.body;
    const response = yield projects_service_1.projectService.updateProject(payload, id);
    res.status(200).json({
        status: true,
        message: "Succssfully updated the Project 😍",
        data: response
    });
});
const getProjectById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield projects_service_1.projectService.getProjectById(id);
    res.status(200).json({
        status: true,
        message: "Succssfully fetched the Project '🎉",
        data: result
    });
});
const deleteProjectById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield projects_service_1.projectService.deleteProjectById(req.params.id);
    res.status(200).json({
        status: true,
        message: "Succssfully deleted the project ❌",
        data: result
    });
});
exports.projectController = { getProjectById, createProject, getAllProjects, updateProject, deleteProjectById };
