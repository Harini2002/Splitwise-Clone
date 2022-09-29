export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Account_details",
      {
        user_id: {
          type: Sequelize.INTEGER,
        },
        phone_number: {
            type: Sequelize.BIGINT,
        },
        default_currency: {
          type: Sequelize.STRING,
        },
        timezone: {
            type: Sequelize.STRING,
        },
        language: {
            type: Sequelize.STRING,
        },
        google_connect: {
            type: Sequelize.BOOLEAN,
        },
        pro_account: {
            type: Sequelize.BOOLEAN,
        },
      },
      { timestamps: true }
    );
  };