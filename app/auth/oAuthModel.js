/**
 * OAuthModel Class.
 */
class OAuthModel {
  /**
    * Retreive access token data, client and user.
    *
    * @param   {string}  accessToken
    *
    * @return  {object}
    */
  async getAccessToken(accessToken) {
    accessToken = (await container.knex('oauth_access_token').where('id', accessToken))[0];
    const client = (await container.knex('oauth_client').where('id', accessToken.client_id))[0];
    const user = (await container.knex('user').where('id', client.user_id))[0];

    return {
      accessToken: accessToken.id,
      accessTokenExpiresAt: accessToken.expires_at,
      scope: accessToken.scope,
      client: client,
      user: user,
    };
  }

  /**
    * Retreive refresh token data, client and user.
    *
    * @param   {string}  refreshToken
    *
    * @return  {object}
    */
  async getRefreshToken(refreshToken) {
    refreshToken = (await container.knex('oauth_refresh_token').where('id', refreshToken))[0];
    const accessToken = (await container.knex('oauth_access_token').where('id', refreshToken.access_token))[0];
    const client = (await container.knex('oauth_client').where('id', accessToken.client_id))[0];
    const user = (await container.knex('user').where('id', client.user_id))[0];

    return {
      refreshToken: refreshToken.id,
      refreshTokenExpiresAt: refreshToken.expires_at,
      scope: accessToken.scope,
      client: client,
      user: user,
    };
  }

  /**
    * Retreive authorization code data, client and user.
    *
    * @param   {string}  authorizationCode
    *
    * @return  {object}
    */
  async getAuthorizationCode(authorizationCode) {
    authorizationCode = (await container.knex('oauth_refresh_token').where('id', authorizationCode))[0];
    const client = (await container.knex('oauth_client').where('id', authorizationCode.client_id))[0];
    const user = (await container.knex('user').where('id', client.user_id))[0];

    return {
      code: authorizationCode.id,
      expiresAt: authorizationCode.expires_at,
      redirectUri: authorizationCode.redirect_uri,
      scope: authorizationCode.scope,
      client: client,
      user: user,
    };
  }

  /**
    * Retreive client.
    *
    * @param   {number}  clientId
    * @param   {string}  clientSecret
    *
    * @return  {object}
    */
  async getClient(clientId, clientSecret) {
    const client = (await container.knex('oauth_client').where('id', clientId).where('client_secret', clientSecret))[0];

    return {
      id: client.id,
      redirectUris: [client.redirect_uri],
      grants: ['password', 'authorization_code', 'refresh_token'],
    };
  }

  /**
    * Retreive user.
    *
    * @param   {string}  email
    * @param   {string}  password
    *
    * @return  {object}
    */
  async getUser(email, password) {
    const user = await container.userRepository.first({'email': email});
    if (user && user.password && await user.verifyPassword(password)) return user;

    return false;
  }

  /**
    * Retreive user for the given client.
    *
    * @param   {string}  client
    *
    * @return  {object}
    */
  async getUserFromClient(client) {
    return (await container.knex('user').where('id', client.user_id))[0];
  }

  /**
    * Save the given access token.
    *
    * @param   {object}  token
    * @param   {object}  client
    * @param   {object}  user
    *
    *
    * @return  {object}
    */
  async saveToken(token, client, user) {
    await container.knex('oauth_access_token').insert({
      id: token.accessToken,
      expires_at: token.accessTokenExpiresAt,
      scope: token.scope,
      client_id: client.id,
      user_id: user.id,
    });

    await container.knex('oauth_refresh_token').insert({
      id: token.refreshToken,
      expires_at: token.refreshTokenExpiresAt,
      access_token: token.accessToken,
    });

    return {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.expires_at,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      scope: token.scope,
      client: {id: client.id},
      user: {id: user.id},
    };
  }


  /**
    * Save the given authorization code.
    *
    * @param   {object}  code
    * @param   {object}  client
    * @param   {object}  user
    *
    *
    * @return  {object}
    */
  async saveAuthorizationCode(code, client, user) {
    await container.knex('oauth_auth_code').insert({
      authorization_code: code.authorization_code,
      expires_at: code.expiresAt,
      redirect_uri: code.redirect_uri,
      scope: code.scope,
      client_id: client.id,
      user_id: user.id,
    });

    return {
      id: code.authorization_code,
      expiresAt: code.expires_at,
      redirectUri: code.redirect_uri,
      scope: code.scope,
      client: {id: client.id},
      user: {id: user.id},
    };
  }

  /**
    * Revoke thie given refresh token.
    *
    * @param   {string}  token
    *
    * @return  {object}
    */
  async revokeToken(token) {
    return await container.knex('oauth_refresh_token').where('id', token.refreshToken).delete();
  }

  /**
    * Revoke thie given authorization code.
    *
    * @param   {string}  code
    *
    * @return  {object}
    */
  async revokeAuthorizationCode(code) {
    return await container.knex('oauth_auth_code').where('id', code.authorization_code).delete();
  }

  /**
    * Check if the provided access token was authorized the requested scopes.
    *
    * @param   {string}  token
    * @param   {string}  scope
    *
    * @return  {object}
    */
  verifyScope(token, scope) {
    if (!token.scope) {
      return false;
    }
    const requestedScopes = scope.split(' ');
    const authorizedScopes = token.scope.split(' ');
    return requestedScopes.every((s) => authorizedScopes.indexOf(s) >= 0);
  }
}

module.exports = OAuthModel;
