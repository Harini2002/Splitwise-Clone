import express from "express";
import { blackList } from "../Controllers/blacklistController.js";


const router=express.Router();
router.route('/blocked_users').post(blackList);



export default router;