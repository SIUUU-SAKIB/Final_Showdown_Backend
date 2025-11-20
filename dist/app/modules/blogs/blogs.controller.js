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
exports.blogController = void 0;
const blogs_service_1 = require("./blogs.service");
const createBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blogs_service_1.blogService.createBlog(req.body);
        res.status(200).json({
            status: true,
            message: "🎉🎉🎉 Blog created successfully",
            blog
        });
    }
    catch (error) {
        console.log("Error while creating blog", error.message);
    }
});
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit);
        const blogs = yield blogs_service_1.blogService.getAllBlogs(page, limit);
        res.status(200).json({
            status: true,
            message: "Successfully fetched all the blogs",
            data: blogs
        });
    }
    catch (error) {
        console.log("Error fetching blogs" + error);
    }
});
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const payload = req.body;
    const response = yield blogs_service_1.blogService.updateBlog(payload, id);
    res.status(200).json({
        status: true,
        message: "Succssfully updated the blog",
        data: response
    });
});
const getBlogById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blogs_service_1.blogService.getBlogById(id);
    res.status(200).json({
        status: true,
        message: "Succssfully fetched the blog",
        data: result
    });
});
const deleteBlogById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogs_service_1.blogService.deleteBlogById(req.params.id);
    res.status(200).json({
        status: true,
        message: "Succssfully deleted the blog ❌",
        data: result
    });
});
exports.blogController = { getBlogById, createBlog, getAllBlogs, updateBlog, deleteBlogById };
