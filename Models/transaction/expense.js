export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Expense",
      {
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
            type: Sequelize.INTEGER,
          },
        date_time: {
            type: Sequelize.DATE, 
            defaultValue: Sequelize.NOW 
        },
        repeat: {
            type: Sequelize.INTEGER,
        },
        reminder: {
            type: Sequelize.INTEGER,
          },
        img: {
            type: Sequelize.STRING,
        },
        no_group: {
            type: Sequelize.BOOLEAN,
        },
        
      },
      { timestamps: true }
    );
  };