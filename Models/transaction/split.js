export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Split",
      {
        split_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
        },
        expense_id: {
            type: Sequelize.INTEGER,
          },
        member_id: {
            type: Sequelize.INTEGER,
        },
        amount: {
            type: Sequelize.INTEGER,
          },

        
      },
      { timestamps: true }
    );
  };