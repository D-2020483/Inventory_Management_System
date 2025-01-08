import { Router } from "express";
import { createProduct, deleteProduct, getProducts, } from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.delete("/:productId" , deleteProduct);

export default router;