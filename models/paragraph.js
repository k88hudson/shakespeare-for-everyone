module.exports = function( sequelize, DataTypes) {
  return sequelize.define('Paragraph', {
    id: DataTypes.INTEGER,
    ParagraphNum: DataTypes.INTEGER,
    PlainText: DataTypes.TEXT,
    VideoIn: DataTypes.INTEGER,
    VideoOut: DataTypes.INTEGER,
    character_id: DataTypes.INTEGER,
    chapter_id: DataTypes.INTEGER,
  }, {
    timestamps: false
  });
};
