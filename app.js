var express = require('express');
var path = require('path');
var nunjucks = require('nunjucks');
var Habitat = require('habitat');
var persona = require('express-persona');

Habitat.load();

var env = new Habitat();
var app = express();
var port = process.env.PORT || 1989;
var routes = require('./routes');
var db = require('./models')(env.get('DB_NAME'), env.get('DB_USER'), env.get('DB_PASSWORD'), env.get('SQL_LOGGING'));
var nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader(__dirname + '/views'), {
  autoescape: true
});

nunjucksEnv.express(app);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());
app.use(express.cookieSession({
  key: 'shakespeare.sid',
  secret: env.get('SESSION_SECRET'),
  cookie: {
    maxAge: 2678400000, // 31 days. Persona saves session data for 1 month
    secure: !! env.get('FORCE_SSL')
  },
  proxy: true
}));

app.use(function(req, res, next) {
  res.locals({
    email: req.session.email || ''
  });
  next();
});

persona(app, {
  audience: env.get('PERSONA_AUDIENCE')
});

app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/dist'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use(app.router);
routes(app, db);

app.listen(port, function() {
  console.log("Now listening on port " + port);
});
