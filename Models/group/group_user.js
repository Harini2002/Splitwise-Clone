export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Group_user",
      {
        group_id: {
            type: Sequelize.INTEGER,
          
        },
        user_id: {
            type: Sequelize.INTEGER,
          
        },
       },
      { timestamps: true }
    );
  };