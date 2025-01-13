import { Router } from "express";
import { createExpense, getExpensesByCategory } from "../controllers/expenseControllers";

const router = Router();

router.get("/", getExpensesByCategory);
router.post("/", createExpense);

export default router;