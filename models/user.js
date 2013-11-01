module.exports = function( sequelize, DataTypes) {
  return sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    fullName: DataTypes.STRING
  });
};
