export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Settle_cash",
      {
        user_id: {
            type: Sequelize.INTEGER,
          },
        member_id: {
            type: Sequelize.INTEGER,
        },
        group_id: {
            type: Sequelize.INTEGER,
        },
        amount: {
            type: Sequelize.INTEGER,
          },
        date_time: {
            type: Sequelize.DATE, 
            defaultValue: Sequelize.NOW 
        },
        img: {
            type: Sequelize.STRING,
        },
        
      },
      { timestamps: true }
    );
  };