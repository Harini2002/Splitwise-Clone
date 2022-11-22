export default (sequelize, Sequelize) => {
    return sequelize.define(
      "Notify",
      {
        user_id: {
          type: Sequelize.INTEGER,
        },
        add_to_group: {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        },
        add_as_friend: {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        },
        expense_added: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        expense_deleted : {
            type: Sequelize.BOOLEAN,
            defaultValue:true
        },
        expense_due : {
            type: Sequelize.BOOLEAN,
            defaultValue:true
        },
        pays_me: {
            type: Sequelize.BOOLEAN,
            defaultValue:true
        },
        monthly_summary: {
            type: Sequelize.BOOLEAN,
            defaultValue:true
        },
        news_updates: {
            type: Sequelize.BOOLEAN,
            defaultValue:true
        },
      }
    );
  };