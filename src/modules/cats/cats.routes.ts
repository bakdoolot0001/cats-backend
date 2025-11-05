import { Router } from "express";
import catsController from "./cats.controller";

const router = Router();

router.post("/create", catsController.createCatCard)
router.get("/", catsController.getAllCats)
router.delete("/delete/:catsId", catsController.deleteCatCard)

export default router