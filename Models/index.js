import {Sequelize} from "sequelize";
import dotenv from 'dotenv';
import Group from './group/group.js';
import Knowledge_base_faq from "./info/knowledgeBaseFaq.js";
import Splitwise_team_about from "./info/knowledgeBaseFaq.js";
import Expense from"./transaction/expense.js";
import Settle_cash from"./transaction/settleCash.js";
import Split from "./transaction/split.js";
import Login_devices from "./recent/loginDevices.js";
import Recent_activity from "./recent/recentActivity.js";
import Recent_visits from "./recent/recentVisit.js";
import Account_balance from "./user/accountBalance.js";
import Account_details from "./user/accountDetails.js";
import Black_list from "./user/blacklist.js";
import Notify from "./user/notify.js";
import User_details from "./user/userDetails.js"
import Otp_ver from "./user/otpVerification.js";


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

(async () => {
    try{
    await sequelize.sync({ force: true });
    console.log("Drop and Resync DB");
    }
    catch(ex){
        console.log("here", ex.message)
    }
  })();


const db={}

db.Sequelize=Sequelize;
db.sequelize=sequelize;

//group
db.group = Group(sequelize, Sequelize);

//info -stand alone
db.knowledge_base_faq = Knowledge_base_faq(sequelize, Sequelize);
db.splitwise_team_about = Splitwise_team_about(sequelize, Sequelize);

//recent
db.login_devices = Login_devices(sequelize, Sequelize);
db.recent_activity = Recent_activity(sequelize, Sequelize);
db.recent_visits = Recent_visits(sequelize, Sequelize);

//transaction
db.expense = Expense(sequelize, Sequelize);
db.settle_cash = Settle_cash(sequelize, Sequelize);
db.split = Split(sequelize, Sequelize);

//user
db.account_balance = Account_balance(sequelize, Sequelize);
db.account_details = Account_details(sequelize, Sequelize);
db.black_list= Black_list(sequelize, Sequelize);
db.notify= Notify(sequelize, Sequelize);
db.user_details= User_details(sequelize, Sequelize);
db.otp_ver=Otp_ver(sequelize,Sequelize);

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

//group
db.user_details.hasMany(db.group,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.user_details.belongsTo(db.group,{
    foreignKey:"user_id",
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

export  default db;




















