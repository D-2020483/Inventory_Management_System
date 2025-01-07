import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

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

{/*export const updateProduct = async(
    req : Request,
    res : Response
): Promise<void> => {
    try {
        const { productId } = req.params;
        const { name , price , rating, stockQuantity} = req.body;

        const existingProduct = await prisma.products.findUnique ({
            where: { productId},
        });

        if (!existingProduct) {
            res.status(404).json({message: "Product not found"});
            return;
        }

        const updateProduct = await prisma.products.update({
            where: { productId },
            data: {
                name,
                price,
                rating,
                stockQuantity,
            },
        });

        res.status(200).json(updateProduct);
        
    } catch (error) {

        res.status(500).json({message: "Error updating product" })
        
    }
}

export const deleteProduct = async(
    req: Request,
    res: Response,
): Promise<void> =>{
    try {
        const { productId } = req.params;

        const product = await prisma.products.delete({
            where: { productId },
        });

        if (!product){
            res.status(404).json({message:"Product not found" })
        }

        await prisma.products.delete({
            where: { productId },
        });

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product"});
    }
};*/}