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
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const env_config_1 = require("./app/config/env.config");
const seedAdmin_1 = require("./app/utils/seedAdmin");
let server;
dotenv_1.default.config();
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(env_config_1.envVariable.DATABASE_URL);
        console.log("🚀🚀 Connected to Database");
        if (env_config_1.envVariable.NODE_ENV !== "production") {
            yield (0, seedAdmin_1.seedAdmin)();
            console.log("✅ Admin seeding successfully");
        }
        server = app_1.default.listen(env_config_1.envVariable.PORT, () => {
            console.log(`SERVER IS RUNNING AT http://localhost:${env_config_1.envVariable.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
process.on("SIGTERM", () => {
    console.log("SIGTERM signal recieved... Server shutting down..");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("SIGINT", () => {
    console.log("SIGINT signal recieved... Server shutting down..");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejecttion detected... Server shutting down..", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception detected... Server shutting down..", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
startServer();
