export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Recent_visits",
      {
        user_id: {
            type: Sequelize.INTEGER,
        },
        date: {
            type: Sequelize.DATE, 
        },
        device: {
            type: Sequelize.STRING,
        },
        location : {
            type: Sequelize.STRING,
        },
        user_agent: {
            type: Sequelize.STRING,
        },
        ip_add: {
            type: Sequelize.STRING,
        },
      
      },
      { timestamps: true }
    );
  };