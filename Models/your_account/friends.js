export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Friend",
      {
        user_id: {
          type: Sequelize.INTEGER,
        },
        friend_id: {
          type: Sequelize.INTEGER,
         
        },
        verified:{
            type:Sequelize.BOOLEAN,
            default:false
        }
    },
      { timestamps: true }
    );
  };