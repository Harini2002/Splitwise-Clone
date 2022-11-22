export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Recent_activity",
      {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        //1-create group , 2-group-expense 3individual -expense 4-simplyfy 5-delete-group-expense 6.delete-inividual -expense 7-settle_cash,
        type:{
          type:Sequelize.INTEGER
        },
        user_id: {
          type: Sequelize.INTEGER,
      },
        name:{
          type:Sequelize.STRING,
          defaultValue:null
        },
        
        to_:{
          type:Sequelize.STRING
        },
        date_time: {
          type: Sequelize.DATE, 
          defaultValue: Sequelize.NOW 
      },
      
      },
      { timestamps: true }
    );
  };