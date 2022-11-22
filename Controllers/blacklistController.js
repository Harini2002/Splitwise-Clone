import db from "../Models/index.js";

const Black_list=db.black_list;




const blackList=async(req,res)=>{
    
    try {
        console.log("in block")
        const newBlackList = await Black_list.create({
  
            user_id: req.body.user_id,
            black_listed_id: req.body.black_listed_id,
        
          });
          console.log("out of block")
          res.json({
            status:"success",
            message:"Black list added",
          })
        console.log("success")
        
    } catch (error) {
        res.json({
            status:"Failed",
            message:error.message,
           }); 
        
    }

};

export {blackList};