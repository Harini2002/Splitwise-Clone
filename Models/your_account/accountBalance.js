export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Account_balance",
      {
        user_id: {
          type: Sequelize.INTEGER,
        },
        total_balance: {
            type: Sequelize.FLOAT,
            defaultValue:0.00
        },
        you_owe: {
            type: Sequelize.FLOAT,
            defaultValue:0.00
        },
        you_owed: {
            type: Sequelize.FLOAT,
            defaultValue:0.00
        },
      },
      { timestamps: true }
    );
  };