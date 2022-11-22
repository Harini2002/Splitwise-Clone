export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Black_list",
      {
        user_id: {
          type: Sequelize.INTEGER,
        },
        black_listed_id: {
          type: Sequelize.INTEGER,
         
        },
      },
      { timestamps: true }
    );
  };