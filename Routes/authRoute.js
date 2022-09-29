import express from "express";
import {currconvert}  from "../Controllers/currcontroler.js";
import { signUp,login ,verifyotp} from "../Controllers/authcontroller.js";


const router=express.Router();

router.route('/login').post(login);

router.route('/signup').post(signUp)
router.route('/verifyotp').post(verifyotp)


router.route('/account/settings/currconvert').post(currconvert);

export default router;