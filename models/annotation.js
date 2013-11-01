module.exports = function( sequelize, DataTypes) {
  return sequelize.define('Annotation', {
    id: DataTypes.INTEGER,
    paragraph_start_id: DataTypes.INTEGER,
    paragraph_end_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    LineStart: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    LineEnd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    PlainText: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    locale: {
      type: DataTypes.STRING,
      defaultValue: 'en-US'
    }
  });
};
