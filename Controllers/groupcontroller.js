import db from "../Models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const Group=db.group;
const User=db.user_details;

const createGroup=async(req,res)=>{
    try {
        const group_name=req.body.group_name;
        const user_ls=req.body.user_ls;
        const type=req.body.type;
        const simplify=req.body.simplify;

        console.log(user_ls)
        const admin=await User.findAll({
             where: {
              email:user_ls[0].email,
              user_name:user_ls[0].user_name 
            },attributes: ['user_id'],
          }  )
        
       
        const group_admin=await Group.create({
           group_name:group_name,
           user_id:admin[0].user_id,
           simplify:simplify,
           type:type
         })
      
        const group_id=group_admin.dataValues.group_id;

        
      
         

        
    } catch (error) {
        console.log(error.message);
    }

}


export{createGroup};