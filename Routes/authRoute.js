import express from "express";
import {currconvert}  from "../Controllers/accountController.js";
import { signUp,login ,verifyotp,login_register,sentotp,resetPassword,newPassword} from "../Controllers/authcontroller.js";
import { notify_settings } from "../Controllers/notifyController.js";
import { recentActivity } from "../Controllers/recentController.js";
import { recentVisits } from "../Controllers/recentController.js";




const router=express.Router();

router.route('/login').post(login);
router.route('/recentactivity').post(recentActivity)
router.route('/recentvisit').post(recentVisits)
router.route('/logindevices').post(login_register)
router.route('/resentotp').post(sentotp)
router.route('/signup').post(signUp)
router.route('/verifyotp').post(verifyotp)
router.route('/forgotpassword').post(resetPassword)
router.route('/newpassword').post(newPassword)


router.route('/account/settings/currconvert').post(currconvert);
router.route('/account/settings/notify').post(notify_settings)


export default router;