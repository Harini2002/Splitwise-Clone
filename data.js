import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

async function addStaticData(db){
  const Category =db.category;
  const Sub_category=db.sub_category;

  await Category.bulkcreate([{
    category_name:"Entertainment"
  },{
    category_name:"Food and drink"
  },{
    category_name:"Home"
  },{
    category_name:"Life"
  },{
    category_name:"Transportation"
  },{
    category_name:"Uncategorized"
  },{
    category_name:"Utilities"
  }]
  )

  await Sub_category.bulkcreate([{
    category_id:1,
    sub_category_name:"Games",
  },{
    category_id:1,
    sub_category_name:"Movies",
  },{
    category_id:1,
    sub_category_name:"Music",
  },{
    category_id:1,
    sub_category_name:"Other",
  },{
    category_id:1,
    sub_category_name:"Sports",
  },{
    category_id:2,
    sub_category_name:"Dining out",
  },{
    category_id:2,
    sub_category_name:"Groceries",
  },{
    category_id:2,
    sub_category_name:"Liquor",
  },{
    category_id:2,
    sub_category_name:"Other",
  },{
    category_id:3,
    sub_category_name:"Electronics",
  },{
    category_id:3,
    sub_category_name:"Furniture",
  },{
    category_id:3,
    sub_category_name:"Household supplies",
  },{
    category_id:3,
    sub_category_name:"Maintenance",
  },{
    category_id:3,
    sub_category_name:"Mortgage",
  },{
    category_id:3,
    sub_category_name:"Other",
  },{
    category_id:3,
    sub_category_name:"Pets",
  },{
    category_id:3,
    sub_category_name:"Rent",
  },{
    category_id:3,
    sub_category_name:"Services",
  },{
    category_id:4,
    sub_category_name:"Childcare",
  },{
    category_id:4,
    sub_category_name:"Clothing",
  },{
    category_id:4,
    sub_category_name:"Education",
  },{
    category_id:4,
    sub_category_name:"Gifts",
  },{
    category_id:4,
    sub_category_name:"Insurance",
  },{
    category_id:4,
    sub_category_name:"Medical expenses",
  },{
    category_id:4,
    sub_category_name:"Other",
  },{
    category_id:4,
    sub_category_name:"Taxes",
  },{
    category_id:5,
    sub_category_name:"Bicycle",
  },{
    category_id:5,
    sub_category_name:"Bus/train",
  },{
    category_id:5,
    sub_category_name:"Car",
  },{
    category_id:5,
    sub_category_name:"Gas/fuel",
  },{
    category_id:5,
    sub_category_name:"Hotel",
  },{
    category_id:5,
    sub_category_name:"Other",
  },{
    category_id:5,
    sub_category_name:"Parking",
  },{
    category_id:5,
    sub_category_name:"Plane",
  },{
    category_id:5,
    sub_category_name:"Taxi",
  },{
    category_id:6,
    sub_category_name:"General",
  },{
    category_id:7,
    sub_category_name:"Cleaning",
  },{
    category_id:7,
    sub_category_name:"Electricity",
  },{
    category_id:7,
    sub_category_name:"Heat/gas",
  },{
    category_id:7,
    sub_category_name:"Other",
  },{
    category_id:7,
    sub_category_name:"Trash",
  },{
    category_id:7,
    sub_category_name:"TV/Phone/Internet",
  },{
    category_id:7,
    sub_category_name:"Water",
  }
])
}

 async function populateData(db) {
    
    const Expense =db.expense;
    const Individual_expense=db.individual_expense;
    const Split=db.split;
    const User = db.user_details;
    const Verifer=db.otp_ver;
    const Login_devices=db.login_devices;
    const Notify=db.notify;
    const Account_balance=db.account_balance;
    const Account_details=db.account_details;

   
    for (let i = 1; i < 1001; i++) {
   
      const name = faker.name.fullName();

   
    const newUser = await User.create({
      user_name:  name.toLowerCase().replace(" ", "_"),
      password: bcrypt.hashSync(faker.internet.password(), 8),
      phone_number: faker.phone.number("9#########"),
      email: faker.internet.email() ,
      verified:true
    });
    
 


    for (let j=1;j<100;j++){
      await Expense.create({
        created_by: newUser.dataValues.user_id,
        user_id:newUser.dataValues.user_id,
        group_id:faker.datatype.number({ min: 10, max: 1000 }),
        expense_name:faker.random.word(),
        amount:faker.datatype.number({ min: 10, max: 1000 })
      })
    }
 
    if(i==1){
    console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    }

    await Notify.create({
      user_id: newUser.dataValues.user_id,
      add_a_friend: faker.datatype.number({ min: 1, max: 2 }),
      add_to_group: faker.datatype.number({ min: 1, max: 2 }),
      expense_added: faker.datatype.number({ min: 1, max: 2 }),
      expense_detected:faker.datatype.boolean(),
      expense_due:faker.datatype.boolean(),
      pays_me: faker.datatype.boolean(),
      monthly_summary: faker.datatype.boolean(),
      news_update: faker.datatype.boolean(),
    });

    let you_owe=faker.datatype.number({ min: 10, max: 1000 });
    let you_owed=faker.datatype.number({ min: 10, max: 1000 })
    await Account_balance.create({
      user_id: newUser.dataValues.user_id,
      you_owe:you_owe,
      you_owed:you_owed,
      total_balance:0
   
    });

    }

}

export default {populateData,addStaticData};