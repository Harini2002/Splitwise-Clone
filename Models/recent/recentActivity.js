export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Recent_activity",
      {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
        },
        date: {
            type: Sequelize.DATE, 
        },
        amount: {
            type: Sequelize.INTEGER,
        },
        group_id: {
            type: Sequelize.INTEGER,
        },
      
      },
      { timestamps: true }
    );
  };