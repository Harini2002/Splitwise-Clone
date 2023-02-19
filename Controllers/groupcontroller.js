
import db from "../Models/index.js";




const Group=db.group;
const User=db.user_details;
const ConnectUG=db.group_user;
const Expense=db.expense;
const Recent_activities=db.recent_activity;

const getGroup=async(req,res)=>{
    try {
       console.log("inside..get grp...")
        const grouplist= await Group.findAll({
            where:{
                created_by:req.body.user_id
            },
            attributes: ['group_name','group_id'], 
        })
        console.log(grouplist)
        res.json({
            status:"200",
            grouplist:grouplist,
            message:"executed"
        })
    } catch (error) {
        res.json({
            status:500,
            message:error.message
        })
    }
}
const createGroup=async(req,res)=>{
    try {
    
        const user_ls=req.body.user_ls;
        const created_by=req.body.created_by;
    

      
        const newGroup=await Group.create({
            group_name:req.body.group_name,
            simplify:req.body.simplify,
            type:req.body.type,
            created_by:created_by
          })
          await  ConnectUG.create({
            user_id:created_by,
            group_id:newGroup.group_id
        })
       
        // user_ls.forEach(async(element) =>{
           
        //     const user= await User.findOne({
        //         where:{
        //             email:element.email
        //         },
        //         attributes:['user_id']

        //     })
          
        // await  ConnectUG.create({
        //     user_id:user,
        //     group_id:newGroup.group_id
        // })
            
        // await Recent_activities.create({
        //     type:1,
        //     name:req.body.group_name,
        //     user_id:created_by,
        // })


        // });
        res.json({
            status:"200",
           
            message:"created .....",
        })
        
    } catch (error) {
        console.log(error.message);
    }

}

// const export_spreadsheet=async(req,res)=>{
//     try {
//         const data=await  Expense.findAll({
//             include:[
//             {
//                 model:Individual_expense,
//                 where:{user_id:req.body.user_id}
//             },
//             {
//                 model:Group,
//                 where:{user_id:req.body.user_id}
//             },
//             {
//                 model:Settle_cash,
//                 where:{user_id:req.body.user_id}
//             },
        
//         ]

//         })

//         const jsonData =...;

//         const json2csvParser = new Json2csvParser({ header: true });
//          const csv = json2csvParser.parse(jsonData);
//     } catch (error) {
        
//     }
// }

export{createGroup,getGroup};