module.exports = function(app, db) {

  // Create Users
  app.post('/user/create', function(req, res) {
    console.log(req.body);
    db.User
      .build({
        email: req.body.email,
        username: req.body.username,
        fullName: req.body.fullName
      })
      .save()
      .success(function(user) {
        res.json({
          status: 'Success',
          data: user
        });
      })
      .error(function(err) {
        res.send(err);
      });
  });

  // Create user page
  app.get('/sign-up', function(req, res) {
    res.render('new-user.html');
  });

  // List all works
  app.get('/', function(req, res) {
    db.Work.findAll().success(function(data) {
      //res.send(data);
      res.render('all.html', {
        works: data
      });
    });
  });

  app.get('/chapter/:id', function(req, res) {
    db.Chapter.find({
      where: {
        id: req.params.id
      },
      include: [db.Work]
    }).success(function(chapter) {
      db.Paragraph.findAll({
        where: {
          chapter_id: chapter.id
        },
        include: [db.Character]
      }).success(function(paragraphs) {

        paragraphs.map(function(item) {
          item.PlainText = item.PlainText.split('\n');
          return item;
        });

        var data = {
          chapter: chapter,
          paragraphs: paragraphs
        };

        res.render('chapter.html', data);
        //res.json(data);

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
