import { Router } from "express";
import authRouter from "../modules/auth/auth.routes";
import catsRouter from "../modules/cats/cats.routes";
import cors from "cors";

const globalRouter = Router();

const corsConfig = {
  origin: ["http://localhost:3000", "https://cats-backend-uaoo.onrender.com/"],
};

globalRouter.use("/auth", cors(corsConfig), authRouter);
globalRouter.use("/cats", cors(corsConfig), catsRouter);

export default globalRouter;
