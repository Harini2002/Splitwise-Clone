import express from "express";
import { createGroup } from "../Controllers/groupcontroller.js";



const router=express.Router();
router.route('/new').post(createGroup)


export default router;