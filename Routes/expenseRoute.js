import express from "express";
import { createExpense,deleteExpense,getExpense } from "../Controllers/expenseController";

const router=express.Router();

router.route('/create').post(createExpense);
router.route('/delete').post(deleteExpense);
router.route('/getexpense').post(getExpense);
router.route('/expense/category').post(getCategory);

export default router;