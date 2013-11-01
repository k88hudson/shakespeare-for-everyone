module.exports = function( sequelize, DataTypes) {
  return sequelize.define('Work', {
    id: DataTypes.INTEGER,
    Title: DataTypes.STRING,
    LongTitle: DataTypes.TEXT,
    Date: DataTypes.INTEGER,
    GenreType: DataTypes.STRING
  }, {
    timestamps: false
  });
};
