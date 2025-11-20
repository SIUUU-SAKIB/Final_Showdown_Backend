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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectService = void 0;
const projects_interface_1 = __importDefault(require("./projects.interface"));
const createProject = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield projects_interface_1.default.create(Object.assign({}, payload));
    return blog;
});
const updateProject = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const updateProject = yield projects_interface_1.default.findByIdAndUpdate(id, { $set: payload }, { new: true, runValidators: true });
    if (!updateProject) {
        throw Error("project not found");
    }
    return updateProject;
});
const getAllBProject = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    console.log(skip);
    const blogs = yield projects_interface_1.default.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    return blogs;
});
const getProjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield projects_interface_1.default.findById(id);
    if (!blog) {
        return new Error("Blog did not found");
    }
    return blog;
});
const deleteProjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield projects_interface_1.default.findByIdAndDelete(id);
    return blog;
});
exports.projectService = { createProject, updateProject, deleteProjectById, getAllBProject, getProjectById };
