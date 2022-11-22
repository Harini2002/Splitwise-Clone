export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Group",
      {
        created_by:{
          type:Sequelize.INTEGER
       },
        group_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
      
        group_name: {
          type: Sequelize.STRING,
        },
        simplify: {
            type: Sequelize.BOOLEAN,
        },
        type: {
            type: Sequelize.STRING,
        },
      },
      { timestamps: true }
    );
  };