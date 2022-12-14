export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Settle_cash",
      {
        created_by:{
          type:Sequelize.INTEGER
       },
        settle_id:{
          type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
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
            type: Sequelize.FLOAT,
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