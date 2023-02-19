import {Sequelize} from "sequelize";
import dotenv from 'dotenv';
import Group from './group/group.js';
import Knowledge_base_faq from "./info/knowledgeBaseFaq.js";
import Splitwise_team_about from "./info/knowledgeBaseFaq.js";
import Settle_cash from"./transaction/settleCash.js";
import Split from "./transaction/split.js";
import Individual_expense from "./transaction/expense/individualExpense.js";
import Login_devices from "./privacy_security/loginDevices.js";
import Recent_activity from "./privacy_security/recentActivity.js";
import Recent_visits from "./privacy_security/recentVisit.js";
import Account_balance from "./your_account/accountBalance.js";
import Account_details from "./your_account/accountDetails.js";
import Black_list from "./your_account/blacklist.js";
import Notify from "./your_account/notify.js";
import User_details from "./your_account/userDetails.js"
import Otp_ver from "./your_account/otpVerification.js";
import Group_user from "./group/group_user.js";
import Expense from "./transaction/expense/expense.js"
import Expense_split from "./transaction/expense_split.js";
import Friends from "./your_account/friends.js";
import Comments from "./transaction/comments.js";
import Category from "./transaction/category/category.js"
import Sub_category from "./transaction/category/subcategory.js"

import populateData from "../data.js";


dotenv.config();

const sequelize = new Sequelize('Splitdb', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    logging:false ,
    sync: true 
  });

const db_connect= async ()=>{

    sequelize.authenticate()
    .then(() => {
    console.log("db connected");
    })
    .catch((err) => {
    console.log("Error: ", err);
    }); 
}

db_connect();

// (async () => {
//     try{
//     await sequelize.sync({ force: true });
//     console.log("Drop and Resync DB");
//     }
//     catch(ex){
//         console.log("here", ex.message)
//     }
//   })();


const db={}
db.Sequelize=Sequelize;
db.sequelize=sequelize;

//group
db.group = Group(sequelize, Sequelize);
db.group_user=Group_user(sequelize,Sequelize);

//info -stand alone
db.knowledge_base_faq = Knowledge_base_faq(sequelize, Sequelize);
db.splitwise_team_about = Splitwise_team_about(sequelize, Sequelize);

//recent
db.login_devices = Login_devices(sequelize, Sequelize);
db.recent_activity = Recent_activity(sequelize, Sequelize);
db.recent_visits = Recent_visits(sequelize, Sequelize);

//transaction
db.category=Category(sequelize, Sequelize);
db.sub_category=Sub_category(sequelize,Sequelize);
db.expense_split = Expense_split(sequelize, Sequelize);
db.expense = Expense(sequelize, Sequelize);
db.individual_expense = Individual_expense(sequelize, Sequelize);
db.settle_cash = Settle_cash(sequelize, Sequelize);
db.split = Split(sequelize, Sequelize);
db.comments=Comments(sequelize,Sequelize);

//user
db.account_balance = Account_balance(sequelize, Sequelize);
db.account_details = Account_details(sequelize, Sequelize);
db.black_list= Black_list(sequelize, Sequelize);
db.notify= Notify(sequelize, Sequelize);
db.user_details= User_details(sequelize, Sequelize);
db.otp_ver=Otp_ver(sequelize,Sequelize);
db.friends=Friends(sequelize,Sequelize);

//relations
//user
db.notify.hasOne(db.user_details,{
    foreignKey:"user_id",
    onDeletee:"CASCADE",
    onUpdate:"CASCADE"
})
db.notify.belongsTo(db.user_details,{
    foreignKey:"user_id",
    onDeletee:"CASCADE",
    onUpdate:"CASCADE"
})

db.account_balance.hasOne(db.user_details,{
    foreignKey:"user_id",
    onDeletee:"CASCADE",
    onUpdate:"CASCADE"
})
db.account_balance.belongsTo(db.user_details,{
    foreignKey:"user_id",
    onDeletee:"CASCADE",
    onUpdate:"CASCADE"
})

db.account_details.hasOne(db.user_details,{
    foreignKey:"user_id",
    onDeletee:"CASCADE",
    onUpdate:"CASCADE"
})
db.account_details.belongsTo(db.user_details,{
    foreignKey:"user_id",
    onDeletee:"CASCADE",
    onUpdate:"CASCADE"
})

db.user_details.hasMany(db.black_list,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.user_details.belongsTo(db.black_list,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.user_details.hasMany(db.black_list,{
    foreignKey:"member_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.user_details.belongsTo(db.black_list,{
    foreignKey:"member_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.user_details.hasMany(db.friends,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.user_details.belongsTo(db.friends,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.user_details.hasMany(db.friends,{
    foreignKey:"friend_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.user_details.belongsTo(db.friends,{
    foreignKey:"friend_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

//group
db.user_details.hasMany(db.group_user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.user_details.belongsTo(db.group_user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.group.hasMany(db.group_user,{
    foreignKey:"group_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.group.belongsTo(db.group_user,{
    foreignKey:"group_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

//recent
db.user_details.hasMany(db.login_devices,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.user_details.belongsTo(db.login_devices,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.user_details.hasMany(db.recent_activity,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.user_details.belongsTo(db.recent_activity,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.user_details.hasMany(db.recent_visits,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.user_details.belongsTo(db.recent_visits,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

//transaction
db.category.hasMany(db.sub_category,{
    foreignKey:"category_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.category.belongsTo(db.sub_category,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.user_details.hasMany(db.settle_cash,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.user_details.belongsTo(db.settle_cash,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.user_details.hasMany(db.settle_cash,{
    foreignKey:"member_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.user_details.belongsTo(db.settle_cash,{
    foreignKey:"member_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.user_details.hasMany(db.expense,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.user_details.belongsTo(db.expense,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.expense.hasMany(db.comments,{
    foreignKey:"expense_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.expense.belongsTo(db.comments,{
    foreignKey:"expense_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.settle_cash.hasMany(db.comments,{
    foreignKey:"settle_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.settle_cash.belongsTo(db.comments,{
    foreignKey:"settle_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.expense.hasMany(db.expense_split,{
    foreignKey:"expense_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.expense.belongsTo(db.expense_split,{
    foreignKey:"expense_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.split.hasMany(db.expense_split,{
    foreignKey:"split_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.split.belongsTo(db.expense_split,{
    foreignKey:"split_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.user_details.hasMany(db.individual_expense,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.user_details.belongsTo(db.individual_expense,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})


db.expense.hasMany(db.split,{
    foreignKey:"expense_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.expense.belongsTo(db.split,{
    foreignKey:"expense_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.user_details.hasMany(db.split,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.user_details.belongsTo(db.split,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.user_details.hasMany(db.split,{
    foreignKey:"member_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.user_details.belongsTo(db.split,{
    foreignKey:"member_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
//populateData(db);
export  default db;




















