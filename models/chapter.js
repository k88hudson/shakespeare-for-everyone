module.exports = function( sequelize, DataTypes) {
  return sequelize.define('Chapter', {
    id: DataTypes.INTEGER,
    Act: DataTypes.INTEGER,
    Scene: DataTypes.INTEGER,
    Description: DataTypes.TEXT,
    work_id: DataTypes.INTEGER
  }, {
    timestamps: false
  });
};
