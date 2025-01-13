import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";


const prisma = new PrismaClient();

export const getProducts = async (
    req: Request, 
    res: Response
): Promise<void> => {
   try {
    const search = req.query.search?.toString();
    const products = await prisma.products.findMany({
        where:{
            name: {
                contains: search
            },
        },
    });
    res.json(products);
   } catch (error) {
    res.status(500).json({message: "Error retrieving products"});
   }
};

export const createProduct = async(
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { productId, name, price, rating, stockQuantity} = req.body;
        const product = await prisma.products.create({
           data: {
            productId,
            name,
            price,
            rating,
            stockQuantity,
           },
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({message: "Error retrieving creating product"});
    }
};

export const updateProduct = async(
    req : Request,
    res : Response
): Promise<void> => {
    try {
        const { productId } = req.params;
        const { name , price , rating, stockQuantity} = req.body;

        const updateProduct = await prisma.products.update ({
            where: { productId},
            data: { name, price, rating, stockQuantity },

        });
        res.status(200).json(updateProduct);
        
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({message: "Error updating product" })
        
    }
}

export const deleteProduct = async(
    req: Request,
    res: Response,
) =>{
    
    try {
        const { productId } = req.params;
        await prisma.products.deleteMany({
            where: { productId },
        });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error deleting product"});
    }
};

export const getInventoryReport = async (
    req: Request, 
    res: Response
) : Promise <void> => {
    try {
        const { type } = req.query;
        const now = new Date();
        let startDate: Date | undefined;

        if (type === "daily"){
            startDate = new Date(now);
            startDate.setHours(0, 0, 0, 0)
        } else if (type === "weekly"){
            startDate = new Date(now);
            startDate.setDate(now.getDate() -now.getDate());
            startDate.setHours(0, 0, 0, 0);
        } else if (type === "Monthly"){
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        } else {
            res.status(400).json({ message: "Invalid report type" });
        }

        const inventoryData = await prisma.products.findMany({
            where:{
                createdAt:{ 
                    gte: startDate,
                },
            } 
        });
        res.status(200).json(inventoryData);
    } catch (error){
        console.error("Error generating report:", error);
        res.status(500).json({ message: "Error generating report" });
    }
};