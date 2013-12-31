module.exports = function(app, db) {

  return {
    chapter: function(id, callback) {
      db.Chapter.find({
        where: {
          id: id
        },
        include: [db.Work]
      }).success(function(chapter) {
        db.Paragraph.findAll({
          where: {
            chapter_id: chapter.id
          },
          include: [db.Character]
        }).success(function(paragraphs) {
          var data = {
            chapter: chapter,
            work: chapter.work,
            paragraphs: paragraphs
          };

          callback(data);

        });
      });
    },
    all

  }

};
