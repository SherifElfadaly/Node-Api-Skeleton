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
    accessToken = await container.accessToken.query().where('id', accessToken).first();
    const client = await container.ouathClient.query().where('id', accessToken.client_id).first();
    const user = await container.user.query().where('id', client.user_id).first();

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
    refreshToken = await container.refreshToken.query().where('id', refreshToken).first();
    const accessToken = await container.accessToken.query().where('id', refreshToken.access_token).first();
    const client = await container.ouathClient.query().where('id', accessToken.client_id).first();
    const user = await container.user.query().where('id', client.user_id).first();

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
    authorizationCode = await container.refreshToken.query().where('id', authorizationCode).first();
    const client = await container.ouathClient.query().where('id', authorizationCode.client_id).first();
    const user = await container.user.query().where('id', client.user_id).first();

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
    const client = await container.ouathClient.query().where('id', clientId).where('client_secret', clientSecret).first();

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
    return await container.user.query().where('id', client.user_id).first();
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
    await container.accessToken.query().insert({
      id: token.accessToken,
      expires_at: token.accessTokenExpiresAt,
      scope: token.scope,
      client_id: client.id,
      user_id: user.id,
    });

    await container.refreshToken.query().insert({
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
    await container.authCode.query().insert({
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
    return await container.refreshToken.query().where('id', token.refreshToken).hardDelete();
  }

  /**
    * Revoke thie given authorization code.
    *
    * @param   {string}  code
    *
    * @return  {object}
    */
  async revokeAuthorizationCode(code) {
    return await container.authCode.query().where('id', code.authorization_code).hardDelete();
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
