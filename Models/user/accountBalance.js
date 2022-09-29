export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Account_balance",
      {
        user_id: {
          type: Sequelize.INTEGER,
        },
        total_balance: {
            type: Sequelize.INTEGER,
        },
        you_owe: {
            type: Sequelize.INTEGER,
        },
        you_owed: {
            type: Sequelize.INTEGER,
        },
      },
      { timestamps: true }
    );
  };