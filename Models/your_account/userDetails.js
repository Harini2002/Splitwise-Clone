export default (sequelize, Sequelize) => {
    return sequelize.define(
      "User_details",
      {
        user_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        user_name: {
          type: Sequelize.STRING,
          allowNull: false,
         
        },
        newuser:{
          type:Sequelize.BOOLEAN,
          defaultValue:true,
          
        }
      },
      { timestamps: true }
    );
  };