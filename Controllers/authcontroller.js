import db from "../Models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';
import { sendMail } from "./mailController.js";


import dotenv from 'dotenv';





dotenv.config();

const User = db.user_details;
const Verifer=db.otp_ver;
const Login_devices=db.login_devices;
const Notify=db.notify;
const Account_balance=db.account_balance;
const Account_details=db.account_details;


// const transporter=nodemailer.createTransport({
//     service:"Gmail",
//     auth:{
//         user:"hg739555@gmail.com ",
//         pass:"ukcuffnoxpcntdgu",
//     },

// });
const sendResSignUp=(res,token,{user_id,user_name,email,newuser},{phone_number,default_currency,language,google_connect,pro_account,timezone},{add_to_group,add_as_friend,expense_added,expense_deleted,expense_due,pays_me,monthly_summary, news_updates})=>{
   
   
     const user_details={user_id,user_name,email,newuser}
     const account_details={phone_number,default_currency,language,google_connect,pro_account,timezone}
     const notification_details={add_to_group,add_as_friend,expense_added,expense_deleted,expense_due,pays_me,monthly_summary, news_updates}

     return res.status(200).send({
        userdetails:user_details,
        account_details:account_details,
        notification_details:notification_details,
        newuser:true,
        accessToken: token,
    });
}

const signUp=async (req, res) => {
    try {
      const email=req.body.email;
     console.log("signup...............node")

      const validateEmail=(email)=> {
         
        let regularExpression  =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if(!regularExpression.test(email)) {
            throw new Error("Invalid Email");
           
        }
       }
    //  validateEmail(email);

      const isuser=await User.findOne({
        where:{
            email:email
        }
      })
      console.log("isuser................")

      if (isuser==null){

         const user_name=req.body.user_name;
         const password=req.body.password
        // validation
        
        const validateUsername=(user_name)=> {

            let regularExpression  = /^[a-z0-9_-]{3,16}$/;
            if(!regularExpression.test(user_name)) {
                throw new Error("Invalid Username");
               
            }
        }
        const validatePassword=(password)=> {

            let regularExpression  =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            if(!regularExpression.test(password)) {
                throw new Error("Invalid password");
               
            }
        }
        // validateUsername(user_name)
        // validatePassword(password)

        //create user
        console.log("create user.................")
        const account = await User.create({
  
            user_name: req.body.user_name,
            password: bcrypt.hashSync(req.body.password, 8),
            email: req.body.email,
        
          });
       
        //   sentotp(req,res);
        var token = jwt.sign({ id: account.user_id }, process.env.SECRET_KEY, {
            expiresIn: 86400,
        });
        
        const notification_update=await Notify.create({
            user_id:account.user_id
        })
        await Account_balance.create({
            user_id:account.user_id
        })
        const acc_details_update=await Account_details.create({
            user_id:account.user_id
        })
    
        
        sendResSignUp(res,token,account.dataValues,acc_details_update.dataValues,notification_update.dataValues)
        // return res.status(200).send({
        //     userdetails:account,
        //     account_details:acc_details_update,
        //     balance_details:acc_balance_update,
        //     notification_details:notification_update,
        //     newuser:true,
        //     accessToken: token,
        // });
      }
      else{
        res.json({
            status:"Failed",
            message:"User already exist"
        })
      }
      
    
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };


  const sentotp=async(req,res)=>{
    try {
        const email=req.body.email;
        const user=await User.findOne({
            where:{
                email:req.body.email
            }
        })
        const user_id=user.dataValues.user_id;
        const otp=`${Math.floor(Math.random() * 999999) + 10000}`;
         console.log(`in sentotp ${otp}`)
        

        const mail_to=email;
        const mail_subject="Verify your email"
        const mail_html=`<p>Your OTP <b>${otp}</b> .Enter in the application to verify your email address</p>`;


        
    

        if(req.body.resend){
      
             await Verifer.update({
                otp:bcrypt.hashSync(otp, 8),
                expired_at:new Date((new Date).getTime() + 10*60000),
                created_at:Date.now(),

             },{where:{
                user_id:user_id
             }})
        }
        else{
         
            await Verifer.create({
            user_id:user_id,
            otp:bcrypt.hashSync(otp, 8),  
            created_at:Date.now(),
            expired_at:new Date((new Date).getTime() + 10*60000)
        
          });
        }
         
          console.log("sending mail......")

           sendMail(mail_to,mail_subject,mail_html);


          console.log("send email............")
          res.json({
            status:"Pending",
            message:'Verification otp email send',
            data:{
                userId:user_id,
                email,
            }
          })
    } catch (error) {

       res.json({
        status:"Failed",
        message:error.message,
       }); 
        
    }
  };



  const verifyotp= async(req,res)=>{
    try {
        
        const{user_id,otp}=req.body;
        // checking for req data
        if (!user_id||!otp){
            throw Error("OTP details unavailable")
        } else{
            
            // getting otps
            const recordOtp=await Verifer.findAll({
                where: {
                user_id: user_id
            }
            })
           
            if (recordOtp.length<=0){
                throw new Error(
                    "Account doesn't exist or has been verified"
                );
            }else{
                // checking record
                const {expired_at}=recordOtp[0];
                const hashedopt=recordOtp[0].otp;

                if(expired_at<Date.now()){
                    await Verifer.destroy({
                        where: { user_id:user_id  }
                        });
                    throw new Error ("Otp has expired,Please request again");
                }else{

                    const validOtp=await bcrypt.compare(otp,hashedopt);
                   
                    if (!validOtp){  //
                        throw new Error("Invalid code passed,check your inbox");
                    }else{

                        await User.update({verified:true},{
                            where:{
                                user_id:user_id
                            }
                        });

                     
                        await Verifer.destroy({
                            where:{
                                user_id:user_id
                            }
                        });

                        res.json({
                            status:"Verified",
                            message:"User email verified successfully.",
                        })
                    
                    }
                }
            
            }
        }
    } catch (error) {
        res.json({
            status:"Failed",
            message:error.message,

        });
    }
  }




  const login = async (req, res) => {
    try {
        let account = await User.findOne({
            where: {
            email: req.body.email,
            },
        });
        
        console.log(account,"account")
        const passwordValid = bcrypt.compareSync(
            req.body.password,
            account.password
        );
        console.log(passwordValid,"valid password")
        if (!passwordValid) {
            return res.status(401).send({
            accessToken: null,
            message: "Invalid Password",
            });
        }

        var token = jwt.sign({ id: account.user_id }, process.env.SECRET_KEY, {
            expiresIn: 86400,
        });
        // login_register(req,res)
        console.log(token)

        return res.status(200).send({
            username: account.user_name,
            email: account.email,
            accessToken: token,
        });

    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };


// login register

  const login_register=async(req,res)=>{
    try {
        const newLoginRegister=await Login_devices.create({
            user_id:req.body.user_id,
            devicedid:req.body.devicedid,
            time:Date.now(),
            login:true
        })
        console.log(" status:Success ,message:login device registered")
      
    } catch (error) {
        res.json({
            status:"Failed",
            message:error.message,

        });
        
    }
  }


// forgotPassword 
const resetPassword=async(req,res)=>{
    try {
        const email=req.body.email;

        const user=await User.findOne({
            where:{
                email:email
            }
        })
        if (!user){
            throw new Error ("User doesn't exsit")
        }
        

        const mail_to=email;
        const mail_subject="Splitwise password reset attempt"
        const mail_html=`<div class="text-center padding">
        <p>
        You requested a password reset link for your Splitwise account. Here it is:
        </p>
        <div>
        <p>link to resent password page</p>
       
        </div>
        <p>
        Please note this link will expire in 24 hours, and can only be used once.<br>If you didn't request this password reset link, you may safely ignore this message; your Splitwise account password will not change.<br>If you'd like assistance, please reply to this message to get in touch with our support team.
<br>Have a great day! –The Splitwise Team
        </p>
       </div>
      `;


      sendMail(mail_to,mail_subject,mail_html);

    } catch (error) {
        res.json({
            status :"Failed",
            message:error.message
        })
        
    }
}

const newPassword=async(req,res)=>{
    try {
        const password=req.body.password;
        const validatePassword=(password)=> {

            let regularExpression  =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            if(!regularExpression.test(password)) {
                throw new Error("Invalid password");
               
            }
        }
        validatePassword(password);

        await User.update({password: bcrypt.hashSync(req.body.password, 8)},{
            where:{
                email:req.body.email
            }
        })

        res.json({
            status:"Verified",
            message:"Successfully resetted the password"
        })

    } catch (error) {
        res.json({
            status:"Failed",
            message:error.message
        })
    }
}




  export { signUp, login,verifyotp,login_register ,sentotp,resetPassword,newPassword};