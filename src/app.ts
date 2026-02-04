import express, { Express } from "express";
import { HTTP_STATUS } from "./constants/httpConstants";
import eventRoutes from "./api/v1/routes/eventRoutes";

const app: Express = express();

app.use(express.json());

app.get("/api/v1/health", (req, res) => {
    res.status(HTTP_STATUS.OK).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

app.use("/api/v1", eventRoutes);

export default app;