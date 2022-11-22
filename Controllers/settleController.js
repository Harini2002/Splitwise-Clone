import db from "../Models/index.js";


const Settle_cash=db.settle_cash;
const Split=db.split;

const settleCash=async(req,res)=>{
    try {
        if (req.body.no_group){
          individualSettle(req)
        }
        else{
          groupSettle(req)
        }
      res.json({
        status:"Success",
        message:"Settled the cash"
      })
    } catch (error) {
        res.json({
            status:"Failed",
            message:"Cash settle failed"
        })
    }
}
const groupSettle=async(req)=>{
    try {
        const newSettle=await Settle_cash.create({
            user_id:req.body.user_id,
            amount:req.body.amount,
            member_id:req.body.to_id,
            group_id:req.body.to_id,
            date_time:Date.now(),
         })

        await Split.destroy({
            where:{
                user_id:req.body.user_id,
                member_id:req.body.member_id,
                group_id:req.body.group_id,
                amount:req.body.amount
                
            }
        })
    } catch (error) {
        throw new Error(error.message)
    }

}
const individualSettle=async(req)=>{
    try {
        const newSettle=await Settle_cash.create({
            user_id:req.body.user_id,
            amount:req.body.amount,
            member_id:req.body.to_id,
            group_id:req.body.group_id,
            date_time:Date.now(),
         })
         await Split.destroy({
            where:{
                user_id:req.body.user_id,
                member_id:req.body.member_id,
                amount:req.body.amount
                
            }
        })
    } catch (error) {
        throw new Error(error.message)
    }
}



export {settleCash};