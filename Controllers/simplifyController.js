import db from "../Models/index.js";

const Split=db.split;
const Group_user=db.group_user;
const Expense_split=db.expense_split;

const simplyfy=async(req,res)=>{
    try {
        const group_id=req.body.group_id;

        const split_ls=await Expense_split.findAll({
            where:{
                group_id:group_id
            },
            include:[{
                model:Split
            }]
        })
        
        const user_ls= await Group_user.findAll({
            where:{
               group_id:gro_id
            },attributes:['user_id']
         })
      
       
        const total_amount={}
        const giver={}
        const setteled={}
        const receiver={}
        user_ls.forEach(user=>{

          let owe=0;
          let owed=0;
          let user_id=user.dataValues.user_id
          split_ls.forEach(split=>{
            if(split.dataValues.user_id== user_id){
                owe+=split.dataValues.amount
            }
            if(split.dataValues.member_id==user_id){
                owed+=split.dataValues.amount
            }

          })
          total_amount.user_id=amount;

        })
        
       

        total_amount.forEach(amount=>{
            if(amount!=0){
              if (amount>0){
              receiver.user_id=amount;
              }
              else{
                giver.user_id=amount;
              }
            }
            else{
                setteled.user_id=amount;
            }
        })
       

    transactions(giver,receiver);
        
    } catch (error) {
        res.json({
            status:"Failed",
            message:error.message
        })
    }
}

const transactions=(array,receiver)=>{
    try {
        const transaction={}

        receiver.forEach((sum) => {
            
            let subsetArray = new Array(array.length)
            .fill(false)
            .map(() => new Array(sum + 1).fill(false));
        
            for (let e = 0; e < array.length; e++) {
            for (let s = 0; s <= sum; s++) {
                if (s === 0 || s === array[e]) {
                    subsetArray[e][s] = true;
                    continue;
                }
                if (e > 0) {
                    if (
                        subsetArray[e - 1][s] === true ||
                        subsetArray[e - 1][s - array[e]] === true
                    ) {
                        subsetArray[e][s] = true;
                    }
                }
            }
            }
            transaction.sum= subsetArray;

            subsetArray.forEach(value=>{
                array.pop(value)
            })
        })
    } catch (error) {
        throw new Error(error.message)
        
    }
    
}





export{simplyfy}