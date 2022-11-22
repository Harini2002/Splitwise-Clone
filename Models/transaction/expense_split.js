export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Expense_split",
      {
        expense_id: {
            type: Sequelize.INTEGER,
          
        },
        split_id: {
            type: Sequelize.INTEGER,
          
        },
        group_id:{
          type:Sequelize.INTEGER,
        }
       },
      { timestamps: true }
    );
  };