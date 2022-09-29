export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Knowledge_base_faq",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        topic: {
            type: Sequelize.STRING,
        },
        question: {
            type: Sequelize.STRING,
        },
        answer: {
            type: Sequelize.STRING,
        },
      
      },
      { timestamps: true }
    );
  };