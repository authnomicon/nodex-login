exports = module.exports = function(csrfProtection) {
  var path = require('path')
    , ejs = require('ejs');
  
  
  function prompt(req, res, next) {
    if (req.user) {
      res.locals.user = req.user;
    }
    res.locals.csrfToken = req.csrfToken();
    
    res.render('login/password', function(err, str) {
      if (err && err.view) {
        var view = path.resolve(__dirname, '../views/prompt.ejs');
        ejs.renderFile(view, res.locals, function(err, str) {
          if (err) { return next(err); }
          res.send(str);
        });
        return;
      } else if (err) {
        return next(err);
      }
      res.send(str);
    });
  }
  
  
  return [
    csrfProtection(),
    prompt
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/csrfProtection'
];