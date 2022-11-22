import db from "../Models/index.js";

const Notify=db.notify;

const notify_settings=async(req,res)=>{
    try {
       
        const notification_update=await Notify.update({
            add_to_group:req.body.add_to_group,
            add_a_friend:req.body.add_a_friend,
            expense_added:req.body.expense_added,
            expense_deleted:req.body.expense_deleted,
            expense_due:req.body.expense_due,
            pays_me:req.body.pays_me,
            monthly_summary:req.body.monthly_summary,
            news_update:req.body.news_update  
        },{ where: { user_id: req.body.user_id } })

        res.json({
            status:"200",
            notification:notification_update,
            message:"Updated notification settings..",
        })
        
    } catch (error) {
        res.json({
            status:"Failed",
            message:error.message,

        });
        
    }
}
export {notify_settings}