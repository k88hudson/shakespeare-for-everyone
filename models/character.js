module.exports = function( sequelize, DataTypes) {
  return sequelize.define('Character', {
    id: DataTypes.INTEGER,
    CharName: DataTypes.STRING,
    Abbrev: DataTypes.STRING,
    Description: DataTypes.TEXT
  }, {
    timestamps: false
  });
};
