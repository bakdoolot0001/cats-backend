import { Router } from "express";
import catsController from "./cats.controller";
import authMiddleware from "../../middleware/authMiddleware";

const router = Router();

router.post("/create", catsController.createCatCard);
router.get("/", catsController.getAllCats);
router.delete("/delete/:catsId", catsController.deleteCatCard);
router.get("/details/:detailId", catsController.detailCats);

export default router;
