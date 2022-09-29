export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Notify",
      {
        user_id: {
          type: Sequelize.INTEGER,
        },
        add_to_group: {
          type: Sequelize.INTEGER,
        },
        add_as_friend: {
          type: Sequelize.INTEGER,
        },
        expense_added: {
            type: Sequelize.INTEGER,
        },
        expense_deteted : {
            type: Sequelize.STRING,
        },
        expense_due : {
            type: Sequelize.STRING,
        },
        pays_me: {
            type: Sequelize.STRING,
        },
        monthly_summary: {
            type: Sequelize.BOOLEAN,
        },
        news_updates: {
            type: Sequelize.STRING,
        },
      },
      { timestamps: true }
    );
  };