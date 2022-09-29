import db from "../Models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';


import dotenv from 'dotenv';



dotenv.config();

const User = db.user_details;
const Verifer=db.otp_ver;

const transporter=nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"hg739555@gmail.com ",
        pass:"ukcuffnoxpcntdgu",
    },

});

const signUp=async (req, res) => {
    try {
      const account = await User.create({
  
        verified:false,
        user_name: req.body.user_name,
        password: bcrypt.hashSync(req.body.password, 8),
        email: req.body.email,
    
      });
      
      sentotp(account,res);
    //   if (account) res.send({ message: "User was registered successfully!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };


  const sentotp=async({user_id,email},res)=>{
    try {
        const otp=`${Math.floor(Math.random() * 999999) + 1}`;
         console.log(`in sentotp ${otp}`)
        const mailoptions={
            from:"hg739555@gmail.com",
            to:email,
            subject:"Verify Your email",
            html:`<p>Your OTP <b>${otp}</b> .Enter in the application to verify your email address</p>`,

        };
    
        const newverify = await Verifer.create({
  
        
            user_id:user_id,
            otp: bcrypt.hashSync(otp, 8),
            created_at:Date.now(),
            exprires_at:Date.now()+3600000,
        
          });
          console.log("sending mail......")
          transporter.sendMail(mailoptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
        //   await transporter.sendMail(mailoptions);
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
        console.log(req.body)
        const{user_id,otp}=req.body;

        // checking for req data
        if (!user_id||!otp){
            throw Error("OTP details unavailable")
        } else{
            console.log(user_id,otp)
            // getting otps
            const recordOtp=await Verifer.findAll({
                where: {
                user_id: user_id
            }
            })
            console.log(recordOtp)

            if (recordOtp.length<=0){
                throw new Error(
                    "Account doesn't exist or has been verified"
                );
            }else{
                // checking record
                const {exprires_at}=recordOtp[0];
                const hashedopt=recordOtp[0].otp;

                if(exprires_at<Date.now()){
                    await Verifer.destroy({
                        where: { user_id:user_id  }
                        });
                    throw new Error ("Code has expired,Please request again");
                }else{

                    const validOtp=await bcrypt.compare(otp,hashedopt);

                    if (!validOtp){
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
        
        
        const passwordValid = bcrypt.compareSync(
            req.body.password,
            account.password
        );
        
        if (!passwordValid) {
            return res.status(401).send({
            accessToken: null,
            message: "Invalid Password",
            });
        }

        var token = jwt.sign({ id: account.user_id }, process.env.ACCESS_TOKEN, {
            expiresIn: 86400,
        });
        return res.status(200).send({
            username: account.user_name,
            email: account.email,
            accessToken: token,
        });

    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  export { signUp, login,verifyotp };