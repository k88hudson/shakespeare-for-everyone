module.exports = function( sequelize, DataTypes) {
  return sequelize.define('Annotation', {
    paragraph_start_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
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
    email: DataTypes.STRING,
    locale: {
      type: DataTypes.STRING,
      defaultValue: 'en-US'
    }
  });
};
