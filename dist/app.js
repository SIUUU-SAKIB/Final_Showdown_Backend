"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const errorHandler_1 = __importDefault(require("./app/middleware/errorHandler"));
const notFound_1 = require("./app/middleware/notFound");
const user_routes_1 = require("./app/modules/user/user.routes");
const blogs_routes_1 = require("./app/modules/blogs/blogs.routes");
const project_routes_1 = require("./app/modules/projects/project.routes");
const app = (0, express_1.default)();
// MIDDLEWARES
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "https://final-showdown-frontend.vercel.app",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
app.use(errorHandler_1.default);
app.set("trust proxy", 1);
// MAIN ROUTES
app.use('/api/v1/', user_routes_1.userRoutes);
app.use('/api/v1/', blogs_routes_1.blogsRoute);
app.use('/api/v1/project/', project_routes_1.projectsRoute);
// DEFAULT ROUTE
app.get(`/`, (req, res) => {
    res.status(200).json({
        message: "WELCOME TO PERSONAL PORTFOLIO BACKEND"
    });
});
app.use(notFound_1.notFoundHandler);
exports.default = app;
