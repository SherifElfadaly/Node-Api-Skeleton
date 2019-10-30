const Request = container.OAuth2Server.Request;
const Response = container.OAuth2Server.Response;

module.exports = (app) => {
  container.oauth = app.oauth = new container.OAuth2Server({
    model: new container.OAuthModel(),
    grants: ['password', 'authorization_code', 'refresh_token'],
    accessTokenLifetime: container.config.token_expires_in * 60,
  });

  app.all('/oauth/token', async (req, res) => {
    const request = new Request(req);
    const response = new Response(res);

    try {
      return res.json(await app.oauth.token(request, response));
    } catch (error) {
      return res.status(500).send({errors: [error.message]});
    }
  });
};
