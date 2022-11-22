export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Expense",
      {
        created_by:{
           type:Sequelize.INTEGER
        },
        expense_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
        },
        group_id: {
            type: Sequelize.INTEGER,
          },
        expense_name: {
          type: Sequelize.STRING,
        },
        amount: {
            type: Sequelize.FLOAT,
          },
        date_time: {
            type: Sequelize.DATE, 
            defaultValue: Sequelize.NOW 
        },
        repeat: {
            type: Sequelize.BOOLEAN,
            defaultValue:false
        },
        reminder: {
            type: Sequelize.BOOLEAN,
            defaultValue:false
          },
        img: {
            type: Sequelize.STRING,
        },
        no_group: {
            type: Sequelize.BOOLEAN,
        },
        reimbursement:{
          type: Sequelize.BOOLEAN,
          defaultValue:false
        }
        
      },
      { timestamps: true }
    );
  };