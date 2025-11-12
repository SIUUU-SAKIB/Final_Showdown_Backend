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
exports.blogService = void 0;
const blogs_interface_1 = require("./blogs.interface");
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_interface_1.BlogsModel.create(Object.assign({}, payload));
    return blog;
});
const updateBlog = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const updateBlog = yield blogs_interface_1.BlogsModel.findByIdAndUpdate(id, { $set: payload }, { new: true, runValidators: true });
    if (!updateBlog) {
        throw Error("Blog not found");
    }
    return updateBlog;
});
const getAllBlogs = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * limit;
    console.log(skip);
    const blogs = yield blogs_interface_1.BlogsModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    return blogs;
});
const getBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_interface_1.BlogsModel.findById(id);
    if (!blog) {
        return new Error("Blog did not found");
    }
    return blog;
});
const deleteBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_interface_1.BlogsModel.findByIdAndDelete(id);
    return blog;
});
exports.blogService = { createBlog, getAllBlogs, updateBlog, getBlogById, deleteBlogById };
