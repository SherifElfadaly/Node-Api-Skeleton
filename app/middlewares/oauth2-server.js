const OAuth2Server = require('oauth2-server');
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;
const Auth = require('../auth/oAuth');

module.exports = (app) => {
  app.oauth = new OAuth2Server({
    model: new Auth(),
    grants: ['password', 'authorization_code', 'refresh_token'],
    debug: container.config.node_env === 'development',
    accessTokenLifetime: container.config.token_expires_in * 60,
  });
  app.all('/oauth/token', obtainToken);

  app.get('/', authenticateRequest, function(req, res) {
    res.send('Congratulations, you are in a secret area!');
  });

  /**
   * [obtainToken description]
   *
   * @param   {[type]}  req  [req description]
   * @param   {[type]}  res  [res description]
   *
   * @return  {[type]}       [return description]
   */
  function obtainToken(req, res) {
    const request = new Request(req);
    const response = new Response(res);

    return app.oauth.token(request, response)
        .then(function(token) {
          res.json(token);
        }).catch(function(err) {
          res.status(err.code || 500).json(err);
        });
  }

  /**
   * [authenticateRequest description]
   *
   * @param   {[type]}  req   [req description]
   * @param   {[type]}  res   [res description]
   * @param   {[type]}  next  [next description]
   *
   * @return  {[type]}        [return description]
   */
  function authenticateRequest(req, res, next) {
    const request = new Request(req);
    const response = new Response(res);

    return app.oauth.authenticate(request, response)
        .then(function(token) {
          next();
        }).catch(function(err) {
          res.status(err.code || 500).json(err);
        });
  }
};
