export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Comments",
      {
      
        parent_id: {
            type: Sequelize.INTEGER,
        },
        type:{
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
        },
        group_id: {
            type: Sequelize.INTEGER,
            defaultValue:null
          },
        date_time: {
            type: Sequelize.DATE, 
            defaultValue: Sequelize.NOW 
        },
        no_group: {
            type: Sequelize.BOOLEAN,
            defaultValue:false

        },
    
      },
      { timestamps: true }
    );
  };