var Sequelize = require('sequelize');

module.exports = function(database, user, password, logging) {
  var sequelize = new Sequelize(database, user, password, {
    logging: logging
  });

  // Import models
  var Chapter = sequelize.import(__dirname + '/chapter.js');
  var Character = sequelize.import(__dirname + '/character.js');
  var Paragraph = sequelize.import(__dirname + '/paragraph.js');
  var Work = sequelize.import(__dirname + '/work.js');

  var Annotation = sequelize.import(__dirname + '/annotation.js');
  var User = sequelize.import(__dirname + '/user.js');

  // Associations
  Paragraph.belongsTo(Chapter, {foreignKey: 'chapter_id'});
  Chapter.hasMany(Paragraph, {foreignKey: 'chapter_id'});

  Chapter.belongsTo(Work, {foreignKey: 'work_id'});
  Work.hasMany(Chapter, {foreignKey: 'work_id'});

  Paragraph.belongsTo(Character, {foreignKey: 'character_id'});
  Character.hasMany(Paragraph, {foreignKey: 'character_id'});

  Annotation.hasMany(Paragraph, {foreignKey: 'paragraph_start_id'});
  Paragraph.hasMany(Annotation, {foreignKey: 'paragraph_start_id'});

  Annotation.belongsTo(User, {foreignKey: 'user_id'});
  User.hasMany(Annotation, {foreignKey: 'user_id'});

  // Sync
  sequelize.sync().complete(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully synced.')
    }
  });

  return {
    Chapter: Chapter,
    Character: Character,
    Paragraph: Paragraph,
    Work: Work,
    Annotation: Annotation,
    User: User
  };

};
