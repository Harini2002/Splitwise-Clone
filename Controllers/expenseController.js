import db from "../Models/index.js";
import { sendMail } from "./mailController.js";

const Expense=db.expense;
const Individual_expense=db.individual_expense;
const Split=db.split;
const Group_user=db.group_user;
const Group=db.group
const User=db.user_details
const Expense_split=db.expense_split;

// const getExpense=async(res,req)=>{
//   try {
   
//   } catch (error) {
   
//   }
// }
const createExpense=async(req,res)=>{
   console.log("inside createExpense")
   const expenseType =req.body.type;
   if ( expenseType==0){
      individualExpense(req,res);
   }
   if ( expenseType==1){
    groupExpense(req,res);

   }
}

const individualExpense=async(req,res)=>{
   try {
      const account = await Individual_expense.create({
        from_user_id:req.body.user_id,
        to_user_id:req.body.to_id,
        amount:req.body.amount,
        date_time:Date.now(),
        expense_name:req.body.expense_name,
        no_group:req.body.no_group
    
      });
      
      const user=await User.findOne({
         where:{
            user_id:req.body.user_id
         }
      })

      const member=await User.findOne({
         where:{
            user_id:req.body.to_id
         }
      })
     
      const group=await Group.findOne({
         where:{
            group_id:gro_id
         }
      })
      const exp_id=account.dataValues.expense_id;
      const amo= account.dataValues.amount;
      const exp_name=account.dataValues.expense_name;
      const user_name= user.dataValues.user_name;

      // split
      await Split.create({
         user_id:user_id,
         expense_id:exp_id,
         member_id:req.body.to_id,
         amount:+(amo/2).toFixed(2)
      })

      

      const mail_to=member.dataValues.email;
      const mail_subject=`'${exp_name}'(${amo}) added by ${user_name}.`
      const mail_html=`   
       <div class="text-center padding">
       <p id="hello">
          Hey ${member.dataValues.user_name}!${user_name} just added "${exp_name}" ".
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
       </div>`
      
      
       sendMail(mail_to,mail_subject,mail_html);


      res.json({
         status:"Success",
         message:'Idividual expense added',
       
       })
     
  
    } catch (err) {
      res.json({
         status:"Failed",
         message:err.message,
        }); 
    }

}
const groupExpense=async(req,res)=>{
   try {
    console.log("inside groupExpense")
     
      const newExpense=await  Expense.create({
          group_id:req.body.group_id,
          user_id:req.body.user_id,
          amount:+req.body.amount,
          date_time:Date.now(),
          expense_name:req.body.expense_name,
          no_group:req.body.no_group

      })
      
    await split_expense(newExpense,req)
   
   res.json({
         status:"Success",
         message:'Group expense-split added',
      
      })

  } catch (error) {
     console.log("error..........groupExpense"+error.message)
          
      
  }

}


const deleteExpense=async(req,res)=>{
   const expenseType =req.body.type;
   if (type==0){
      deleteIndividualExpense(req,res);
   }
   if (type==1){
    deleteGroupExpense(req,res);

   }
}


const deleteGroupExpense=async(req,res)=>{
try {
   await Expense.destroy({
      where: { expense_id:req.body.expense_id  }
      });
} catch (error) {
   res.json({
      status:"Failed",
      message:error.message,

  });
    
}
}



const  deleteIndividualExpense=async(req,res)=>{
   try {
       
      await 

       await Individual_expense.destroy({
          where: { expense_id:req.body.expense_id  }
          });

      
          await Recent_activities.create({
            type:6,
            name:req._name,
            user_id:created_by,
        })
   } catch (error) {
      res.json({
         status:"Failed",
         message:error.message,
   
     });
       
   }
   }



// split_type ,0- equal split,1-unequal split,
const split_expense=async(expense,req)=>{
   
   try {
  
    if (req.body.split_type==0){
      equalSplit(expense,req)
    }
    if (req.body.split_type==1){
      unequalSplit(expense,req)
    }

   } catch (error) {
      throw new Error(error.message)
   }
} 

const equalSplit=async(expense,req)=>{
   try {
      console.log("inside equal split")
      const user_id=expense.dataValues.user_id
      const gro_id= expense.dataValues.group_id;
      const exp_id=expense.dataValues.expense_id;
      const amo= expense.dataValues.amount;
      const exp_name=expense.dataValues.expense_name;
     
      const group=await Group.findOne({
         where:{
            group_id:gro_id
         }
      })

      const group_name=group.dataValues.group_name;

      
      const user_ls= await Group_user.findAll({
         where:{
            group_id:gro_id
         },attributes:['user_id']
      })
    // split calculation
      const split_count=user_ls.length;
      const split_amt=+(amo/split_count).toFixed(2);
    
      // Split , mail notification
        await user_ls.forEach(async(user) => {
         let newSplit;
      
         if (req.body.reimbursement==true){
           newSplit =await Split.create({
               user_id: user.dataValues.user_id,
               expense_id:exp_id,
               member_id:user_id,
               amount:split_amt
            })
            
            await Expense.update({
               where:{
                  expense_id:exp_id
               }
             },{reimbursement:true})
        

         }
         else{
        
         newSplit=await Split.create({
            user_id:user_id,
            expense_id:exp_id,
            member_id:user.dataValues.user_id,
            amount:split_amt
         })
      }

    
         await Expense_split.create({
            expense_id:exp_id,
            split_id:newSplit.dataValues.split_id,
            group_id:gro_id

         })

         const userM=await User.findOne({
            where:{
               user_id:user_id
            }
         })
          
          const user_name= userM.dataValues.user_name;
          const mail_to=userM.dataValues.email;
          const mail_subject=`'${exp_name}'(${amo}) added by ${user_name}.`
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
           </div>`
          
          
           sendMail(mail_to,mail_subject,mail_html);

      });

    
      
   } catch (error) {
      throw new Error(error.message)
   }
}

const unequalSplit=async(expense)=>{
   try {

      console.log("inside unequal split")
      const user_id=expense.dataValues.user_id
      const gro_id= expense.dataValues.group_id;
      const exp_id=expense.dataValues.expense_id;
      const amo= expense.dataValues.amount;
      const exp_name=expense.dataValues.expense_name;
     
      const group=await Group.findOne({
         where:{
            group_id:gro_id
         }
      })
      const group_name=group.dataValues.group_name;

      //list of users
      const user_ls=req.body.user_ls;

      // checking for ratio of split 
       //split_type 0- percentage,type 1- amount)
      const user_split=0
      if (split_type==0){
         user_ls.forEach(user=>{
            user_split+=user.percent87
         })
      }
      if (split_type==1){
         user_ls.forEach(user=>{
            user_split+=user.split_amount
         })
      }
     
    
      if (split_type==0 && user_split!=100){
         throw new Error("split ratio invalid")
      }
      if(split_type==1 && user_split!=amo){
         throw new Error("split ratio invalid")
      }



       await user_ls.forEach(async(user) => {
         //split_type 0- percentage,type 1- amount)
         let split_amt=0
         if (split_type==0){
             split_amt=(parseFloat(percent) / 100) *amo;
         }
         else{
            split_amt=user.split_amt;
         }
         
         
         if (req.body.reimbursement==true){
          await Split.create({
               user_id: user.dataValues.user_id,
               expense_id:exp_id,
               member_id:user_id,
               amount:split_amt
            })

             await Expense.update({
               where:{
                  expens_id:exp_id
               }
             },{reimbursement:true})
         }
         else{
         await Split.create({
            user_id:user_id,
            expense_id:exp_id,
            member_id:user.dataValues.user_id,
            amount:split_amt
         })
      }

           
         await Expense_split.create({
            expense_id:exp_id,
            split_id:newSplit.dataValues.split_id,
            group_id:gro_id
         })

         
         const userM=await User.findOne({
            where:{
               user_id:user_id
            }
         })

          const user_name= userM.dataValues.user_name;
          const mail_to=User_details.dataValues.email;
          const mail_subject=`'${exp_name}'(${amo}) added by ${user_name}.`
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
           </div>`
          
          
           sendMail(mail_to,mail_subject,mail_html);

      });
      
   } catch (error) {
      
   }
}

const getExpense = async (req, res) => {
   const group_id = req.body.group_id;
   const offset = req.body.offset;
   try {
      const data=[]
      const nextSet = await Expense.findAll({
         limit: 10,
         offset: 10* offset,
         order: [["createdAt", "DESC"]],
         where: {
             group_id:group_id
         },
    
       });

       const result = JSON.parse(JSON.stringify(nextSet));
       
      result?.forEach(async(expense)=>{
         const split_amt=await Split.findOne({
            attributes: ["amount"],
            where:{
               expense_id:expense.expense_id
            }
         })
         data.push(
            {
               expense_name:expense.expense_name,
               amount:expense.amount,
               split_amount:split_amt,
               reimbursement:expense.reimbursement,

            }
         )
      
      })
      res.status(200).send(data)
     
   } catch (error) {
    res.json({
      status:"Failed",
      message:error.message
    })
   }
}


export{createExpense,groupExpense,deleteExpense,deleteGroupExpense,getExpense};