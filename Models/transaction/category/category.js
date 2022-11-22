export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Category",
      {
      
        category_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        category_name:{
          type: Sequelize.STRING,
        },
    
      },
      { timestamps: true }
    );
  };