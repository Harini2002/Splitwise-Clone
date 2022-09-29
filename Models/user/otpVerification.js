export default (sequelize, Sequelize) => {
    return sequelize.define(
      "OTPVerification",
      {
        user_id: {
          type: Sequelize.INTEGER,
        },
        otp: {
            type: Sequelize.STRING,
          },
        created_at:{
           type:Sequelize.DATE,
        },
        expired_at:{
           type:Sequelize.DATE,
        },
 
 
    },
      { timestamps: true }
    );
  };