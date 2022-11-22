import { DataTypes } from 'sequelize';

export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Sub_category",
      {
        sub_category_id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        category_id:{
            type: Sequelize.INTEGER,
        },
        sub_category_name:{
            type: Sequelize.STRING,
        },
        
      },
      { timestamps: true }
    );
  };