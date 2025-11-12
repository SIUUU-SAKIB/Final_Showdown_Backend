"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const JWT_1 = require("../utils/JWT");
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader.startsWith("Bearer")) {
        return res.status(401).json({
            message: "Authorization token missing"
        });
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = (0, JWT_1.verifyToken)(token);
    if (!decodedToken) {
        return res.status(401).json({ message: "Invaild or missing token" });
    }
    req.user = decodedToken;
    next();
};
exports.authenticate = authenticate;
