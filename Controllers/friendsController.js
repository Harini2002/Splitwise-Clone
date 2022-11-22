import db from "../Models/index.js";
import { sendMail } from "./mailController.js";


const Friends=db.friends;
const User=db.user_details;

const createFriend=async (req,res)=>{
    try {
        
        const isuser=await User.findOne({
            where:{
                email:req.body.email
            }
        })

        if (isuser.length!=0){
            const newFriend=await Friends.create({
                user_id:req.body.user_id,
                friend_id:isuser.dataValues.user_id,
                verified:true
       })
       }
       else{
        const user=await User.findOne({
            where:{
                user_id:req.body.user_id
            }
        })
        const mail_to=email;
        const mail_subject=`${user.dataValues.user_name} added you as a friend on Splitwise`;
        const mail_html=`
        <div class="text-center padding">
        <p id="hello">
           Hey ${user.dataValues.user_name}!${user_name} just added "${exp_name}" to the group "${group_name}".
        </p> 
       </div>
       <div class="text-center padding" style="border: 1px solid red; width: 80%; margin: 0 auto;">
       <span style="float:left">${Date.now()}</span>
       <span style="float:right">General</span>
       <br>
       <h4>${exp_name}</h4><br>
       <h5>Total:${amo}</h5>
       <h5>You owe :${split_amt}</h5><br>
       <button type="button" class="btn " >View on Splitwise</button>
        </div>``
       `

        sendMail(mail_to,mail_subject,mail_html);

        const account = await User.create({
  
            verified:false,
            email: req.body.email,
        
          });
        
          await Friends.create({
            user_id:req.body.user_id,
            friend_id:account.dataValues.user_id
            
        })

       } 
     
    } catch (error) {
        res.json({
            status:"Failed",
            message:error.message,
           }); 
        
    }
}

export{createFriend};