import { Router } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct, } from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.delete("/:productId" , deleteProduct);
router.patch('/:productId', updateProduct);

export default router;