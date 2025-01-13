import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExpensesByCategory = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const expenseByCategorySummaryRaw = await prisma.expenses.findMany({
            orderBy: {
                timestamp: "desc",
            },
        }
    );
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
        (item) => ({
            ...item,
            amount: item.amount.toString()
        })
    );

    res.json(expenseByCategorySummary);
    } catch (error) {
     res.status(500).json({ message: "Error retriving expenses by category"});   
    }
};

export const createExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const { expenseId,category, amount, timestamp, expenseSummaryId } = req.body;

    const data: Prisma.ExpensesUncheckedCreateInput = {
      expenseId,  
      category,
      amount,
      timestamp: new Date(timestamp),
      expenseSummaryId: expenseSummaryId || null,
    };

    const newExpense = await prisma.expenses.create({ data });

    res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ message: "Error creating expense" });
  }
};


