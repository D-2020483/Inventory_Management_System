"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const router = (0, express_1.Router)();
router.get("/", productController_1.getProducts);
router.post("/", productController_1.createProduct);
router.delete("/:productId", productController_1.deleteProduct);
router.patch('/:productId', productController_1.updateProduct);
router.get("/inventory-report", productController_1.getInventoryReport);
exports.default = router;
