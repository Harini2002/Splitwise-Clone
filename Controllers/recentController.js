import db from "../Models/index.js";

const Recent_activities=db.recent_activity;

const Login_devices=db.login_devices;



const recentActivity=async(req,res)=>{
    try {
        const user_id = req.body.user_id;
        const offset = req.body.offset;
        const data = [];


        const nextSet=await  Recent_activities.findAll({
            limit: 15,
            offset: 15 * offset,
            order: [["createdAt", "DESC"]],
            where:{
                user_id:user_id
            },
      
        })

        const result = JSON.parse(JSON.stringify(nextSet));

        result?.forEach(async(recent)=>{
          
            data.push(
                {  
                   type:recent.type,
                   name:recent.name,
                   from:recent.from,
                   to:recent.to,
                   time:recent.date_time
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



const recentVisits=async(req,res)=>{
    try {
        const result=await Login_devices.findAll({
            where:{
                user_id:req.body.user_id,
            }, order: [["createdAt", "DESC"]]
        })
        res.json({
            status:"Sucess",
            data:result
        })

    } catch (error) {
        res.json({
            status:"Failed",
            message:"Cash settle failed"
        })
    }
}

export {recentActivity,recentVisits};