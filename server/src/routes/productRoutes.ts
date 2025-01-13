import { Router } from "express";
import { createProduct, deleteProduct, getInventoryReport, getProducts, updateProduct } from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.delete("/:productId" , deleteProduct);
router.patch('/:productId', updateProduct);
router.get("/inventory-report", getInventoryReport );


export default router;