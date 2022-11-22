// import CurrencyConverter from 'currency-converter-lt';
import fetch from "node-fetch";
import db from "../Models/index.js";

const Account_details=db.account_details;
const Account_balance=db.account_balance;
const Expense =db.expense;
const Individual_expense=db.individual_expense;
const Split=db.split;

const currconvert =async(req,res)=>{
    try {
     
     const {from_currency,to_currency,total,owe,owed}=req.body;  
        
        fetch(`https://api.exchangerate-api.com/v4/latest/${from_currency}`)
        .then(response => {
              return response.json();
        })
        .then(data => {
           let rate = data.rates[to_currency];
           let total_amt = rate * total;
           let owe_amt = rate * owe;
           let owed_amt = rate * owed;
          
         res.json({total_amt,owe_amt,owed_amt})
        })
    } catch (error) {
        console.log(error)
    }
}


const acc_details_update=async(req,res)=>{
    try {
        const newAccUpdtae=await Account_details.update({
            
                phone_number:req.body.phone_number,
                default_currency:req.body.default_currency,
                timezone:req.body.timezone,
                language:req.body.language,
                google_connect:req.body.google_connect,
                pro_account:req.body.pro_account,
                   
            },{ where: { user_id: req.body.user_id } })
    
            res.json({
                status:"Verified",
                message:"Updated notification settings..",
            })
        
    } catch (error) {


       res.json({
        status:"Failed",
        message:error.message,
       }); 
        
    }
}

const acc_balance_update=async(req,res)=>{
  try {
    let owed_amt=0,owe_amt=0,total_amt=0,split=0;

    const group_owed_ls=await Expense.findAll({
        where:{
            user_id:req.body.user_id,    
        }
    })
   
    const individual_owed_ls=await Individual_expense.findAll({
        where:{
            from_user_id:req.body.user_id,    
        }
    })
    const split_detect=await Split.findAll({
        where:{
            user_id:req.body.user_id,  
            member_id:req.body.user_id
        }
    })

    group_owed_ls.forEach(async(expense)=>{
        owed_amt+=expense.dataValues.amount;
    })

    individual_owed_ls.forEach(async(expense)=>{
        owed_amt+=expense.dataValues.amount;
    })
    split_detect.forEach(async(split)=>{
        split+=split.dataValues.amount;
    })
    const individual_owe_ls=await Individual_expense.findAll({
        where:{
            to_user_id:req.body.user_id,    
        }
    })

    individual_owe_ls.forEach(async(expense)=>{
        owe_amt+=expense.dataValues.amount;
    })

    total_amt=owed_amt-(owe_amt+split_detect);

    await Account_balance.update({
       total_balance:total_amt,
       you_owe:owe_amt,
       you_owed:owed_amt
    },{where:{user_id:eq.body.user_id}})
    
  } catch (error) {
     res.json({
            status:"Failed",
            message:error.message,

        });
  }
}
export {currconvert,acc_details_update,acc_balance_update};