import express from "express";
import { createGroup,getGroup } from "../Controllers/groupcontroller.js";
import {groupExpense,deleteGroupExpense} from "../Controllers/expenseController.js";



const router=express.Router();
router.route('/new').post(createGroup)
router.route('/expense/create').post(groupExpense)
router.route('/expense/delete').post(deleteGroupExpense)
router.route('/settledexpense').post()
router.route('/getgroups').post(getGroup)


export default router;