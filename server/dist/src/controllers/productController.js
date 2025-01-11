"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInventoryReport = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const search = (_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toString();
        const products = yield prisma.products.findMany({
            where: {
                name: {
                    contains: search
                },
            },
        });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving products" });
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, name, price, rating, stockQuantity } = req.body;
        const product = yield prisma.products.create({
            data: {
                productId,
                name,
                price,
                rating,
                stockQuantity,
            },
        });
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving creating product" });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const { name, price, rating, stockQuantity } = req.body;
        const updateProduct = yield prisma.products.update({
            where: { productId },
            data: { name, price, rating, stockQuantity },
        });
        res.status(200).json(updateProduct);
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Error updating product" });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        yield prisma.products.deleteMany({
            where: { productId },
        });
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error deleting product" });
    }
});
exports.deleteProduct = deleteProduct;
const getInventoryReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.query;
        const now = new Date();
        let startDate;
        if (type === "daily") {
            startDate = new Date(now);
            startDate.setHours(0, 0, 0, 0);
        }
        else if (type === "weekly") {
            startDate = new Date(now);
            startDate.setDate(now.getDate() - now.getDate());
            startDate.setHours(0, 0, 0, 0);
        }
        else if (type === "Monthly") {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        }
        else {
            res.status(400).json({ message: "Invalid report type" });
        }
        const inventoryData = yield prisma.products.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                },
            }
        });
        res.status(200).json(inventoryData);
    }
    catch (error) {
        console.error("Error generating report:", error);
        res.status(500).json({ message: "Error generating report" });
    }
});
exports.getInventoryReport = getInventoryReport;
