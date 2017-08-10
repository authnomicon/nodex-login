exports = module.exports = function(parse, csrfProtection, loadState, authenticate, proceed) {
  
  /*
  return [
    require('body-parser').urlencoded({ extended: false }),
    ceremony.loadState('mfa'),
    authenticator.authenticate('session'),
    authenticator.authenticate('mfa-oob'),
    ceremony.complete('mfa'),
    function(err, req, res, next) {
      console.log(err);
      console.log(err.stack);
      next(err);
    },
    ceremony.completeError('mfa')
  ];
  */
  
  return [
    parse('application/x-www-form-urlencoded'),
    function(req, res, next) {
      console.log('OTP AUTHENTICATING...');
      console.log(req.body)
      next();
    },
    csrfProtection(), // TODO: ensure this works on GET requests
    //loadState('login'),
    authenticate('www/oob'),
    function(req, res, next) {
      console.log('OTP AUTHENTICATED!');
      next();
    },
    proceed
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/parse',
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/loadState',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  '../../activity/login/resume'
];