import app from "./app";
import dotenv from "dotenv"
import http from "http"
import { Server } from "http"
import mongoose from "mongoose";
import { envVariable } from "./app/config/env.config";
import { seedAdmin } from "./app/utils/seedAdmin";
let server: Server
dotenv.config()

const startServer = async () => {
    try {
        await mongoose.connect(envVariable.DATABASE_URL)
        console.log("🚀🚀 Connected to Database")
        if (envVariable.NODE_ENV !== "production") {
            await seedAdmin()
            console.log("✅ Admin seeding successfully")
        }

        server = app.listen(envVariable.PORT, () => {
            console.log(`SERVER IS RUNNING AT http://localhost:${envVariable.PORT}`)

        })

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


process.on("SIGTERM", () => {
    console.log("SIGTERM signal recieved... Server shutting down..");

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})

process.on("SIGINT", () => {
    console.log("SIGINT signal recieved... Server shutting down..");

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})


process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejecttion detected... Server shutting down..", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception detected... Server shutting down..", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})
startServer()