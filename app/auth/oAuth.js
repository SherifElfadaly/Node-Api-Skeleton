const Request = container.OAuth2Server.Request;
const Response = container.OAuth2Server.Response;

module.exports = (app) => {
  const config = {
    model: new container.OAuthModel(),
    grants: ['password', 'authorization_code', 'refresh_token'],
    accessTokenLifetime: container.config.token_expires_in * 60,
    refreshTokenLifetime: container.config.refresh_token_expires_in * 60 * 24 * 14,
    allowEmptyState: true,
  };
  container.oauth = app.oauth = new container.OAuth2Server(config);
  container.abstractGrantType = new container.OAuth2Server.AbstractGrantType(config);

  /**
   * Middleware for generating tokens.
   */
  app.all('/oauth/token', async (req, res) => {
    const request = new Request(req);
    const response = new Response(res);

    try {
      return res.json(await app.oauth.token(request, response));
    } catch (error) {
      return res.status(500).send({errors: [error.message]});
    }
  });

  /**
   * Middleware for generating auth codes.
   */
  app.all('/oauth/authorize', async (req, res) => {
    const request = new Request(req);
    const response = new Response(res);

    try {
      return res.json(await app.oauth.authorize(request, response));
    } catch (error) {
      return res.status(500).send({errors: [error.message]});
    }
  });
};
