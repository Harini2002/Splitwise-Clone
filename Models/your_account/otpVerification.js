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
           allowNull: false,
           defaultValue: sequelize.fn('now')
        },
        expired_at:{
           type:Sequelize.DATE,
        },
 
 
    },
      { timestamps: true }
    );
  };