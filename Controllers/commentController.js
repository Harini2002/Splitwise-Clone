import db from "../Models/index.js";

const Comments=db.comments;
// user_id,type(settle,expense),group_id,no_group(true,false),settle_id or expense_id

const comments=async(req,res)=>{
    try {
        if (req.body.no_group){
            if (req.body.type==0){
                const newComment =await Comments.create({
                user_id:req.body.user_id,
                type:req.body.type,
                parent_id:req.body.expense_id,
                })
            }
            else{
                const newComment =await Comments.create({
                    user_id:req.body.user_id,
                    type:req.body.type,
                    parent_id:req.body.settle_id,
                    })

            }

        }
        else{
            if (req.body.type==0){
                const newComment =await Comments.create({
                user_id:req.body.user_id,
                type:req.body.type,
                parent_id:req.body.expense_id,
                group_id:req.body.group_id
                })
            }
            else{
                const newComment =await Comments.create({
                    user_id:req.body.user_id,
                    type:req.body.type,
                    parent_id:req.body.settle_id,
                    group_id:req.body.group_id
                 })


        }
    }
    } catch (error) {
        res.json({
            status:"Failed",
            message:error.message,
           }); 
    }
}


export {comments};