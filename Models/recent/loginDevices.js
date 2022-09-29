export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Login_devices",
      {
        user_id: {
          type: Sequelize.INTEGER,
        },
        deviceid: {
            type: Sequelize.STRING,
        },
        time: {
            type: Sequelize.DATE, 
        },
        login: {
            type: Sequelize.BOOLEAN,
        },
      },
      { timestamps: true }
    );
  };