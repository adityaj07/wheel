import { db } from "@/lib/db";
import { Router, type Request, type Response } from "express";

const healthRouter = Router();

healthRouter.get("/", async (req: Request, res: Response) => {
  try {
    await db.$queryRaw`SELECT 1`;
    res.json({
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      database: "disconnected",
      timestamp: new Date().toISOString(),
    });
  }
});

export default healthRouter;
