export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Individual_expense",
      {
        created_by:{
          type:Sequelize.INTEGER
       },
        expense_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        from_user_id: {
          type: Sequelize.INTEGER,
        },
        to_user_id: {
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