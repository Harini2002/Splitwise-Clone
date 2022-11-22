export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Account_details",
      {
        user_id: {
          type: Sequelize.INTEGER,
        },
        phone_number: {
            type: Sequelize.BIGINT,
            defaultValue:null
        },
        default_currency: {
          type: Sequelize.STRING,
          defaultValue:"USD"
        },
        timezone: {
            type: Sequelize.STRING,
        },
        language: {
            type: Sequelize.STRING,
            defaultValue:"English"
        },
        google_connect: {
            type: Sequelize.BOOLEAN,
            defaultValue:false
        },
        pro_account: {
            type: Sequelize.BOOLEAN,
            defaultValue:false
        },
      }
    );
  };