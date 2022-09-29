export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Splitwise_team_about",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        img: {
            type: Sequelize.STRING,
        },
        content: {
            type: Sequelize.STRING,
        },
      
      },
      { timestamps: true }
    );
  };