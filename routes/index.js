module.exports = function(app, db) {

  // PAGES

  // Create user page
  app.get('/sign-up', function(req, res) {
    res.render('new-user.html');
  });

  // List all works
  app.get('/', function(req, res) {
    db.Work.findAll().success(function(data) {
      res.render('all.html', {
        works: data
      });
    });
  });


  // CHAPTERS, WORKS, ETC

  app.get('/works', function(req, res) {
    db.Work
      .findll()
      .sucess(function(data) {
        res.json(data);
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
        order: 'id',
        where: {
          chapter_id: chapter.id
        },
        include: [db.Character, db.Annotation]
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
  });

  // USERS

  // Create Users
  app.post('/user/create', function(req, res) {
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

  // ANNOTATIONS

  // Create annotations
  app.post('/annotation/create', function(req, res) {
    console.log(req.body);
    db.Annotation
      .build({
        email: req.session.email,
        PlainText: req.body.PlainText,
        paragraph_start_id: req.body.paragraph_id
      })
      .save()
      .success(function(annotation) {
        res.json({
          status: 'Success',
          data: annotation
        });
      })
      .error(function(err) {
        res.send(err);
      });
  });


};
