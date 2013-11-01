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


  // List all works
  app.get('/all', function(req, res) {
    db.Work.findAll().success(function(data) {
      //res.send(data);
      res.render('all.html', {
        works: data
      });
    });
  });

  app.get('/work/:id', function(req, res) {
    db.Work.find({
      where: {
        id: req.params.id
      },
      include: [db.Chapter]
    }).success(function(data) {
      //res.send(data);
      res.render('work.html', data);
    });
  })

};
