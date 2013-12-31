module.exports = function(app, db) {

  function buildSafeQuery(rawQuery, queryParameters) {
    var safe = {};
    for (key in queryParameters) {
      if (rawQuery[key] && db.validate(rawQuery[key], queryParameters[key])) {
        safe[key] = rawQuery[key];
      }
    }
    return safe;
  }

  return {
    annotations: {
      get: function(req, res, next) {

        var query = buildSafeQuery(req.query, {
          paragragraph_id: "INTEGER",
          user_id: "INTEGER",
          locale: "STRING",
          lineStart: "INTEGER",
          lineEnd: "INTEGER"
        });

        db.Annotation
          .findAll()
          .where(query)
          .success(function(data) {
            res.json(data);
          })
          .error(err) {
            next(err);
        });
    },
    post: id: {
      get: put: delete:
    }
  }
}
}
