/**
 * Auth class.
 */
class Auth {
  /**
    * Init new object.
    *
    * @param   {object}  strategy
    *
    * @return  {void}
    */
  constructor(strategy) {
    this.strategy = strategy;
  }

  /**
   * Check for the given credetials.
   *
   * @param   {string}  email
   * @param   {string}  password
   *
   * @return  {string}
   */
  checkCredentials(email, password) {
    return this.strategy.checkCredentials(email, password);
  }

  /**
   * Attemp login.
   *
   * @param   {string}  email
   * @param   {string}  password
   *
   * @return  {string}
   */
  async attempt(email, password) {
    const result = await this.checkCredentials(email, password);
    if (result) {
      const user = await this.userFromToken(result.accessToken);

      /**
       * Only allow confirmed users.
       */
      if ( ! user.confirmed ) {
        container.errorHandlers.emailNotConfirmed();
      }

      return {
        results: user,
        meta: {token: result.accessToken, refreshToken: result.refreshToken, refreshTokenExpiresAt: result.refreshTokenExpiresAt},
      };
    }

    container.errorHandlers.loginFailed();
  }

  /**
   * Refresh access token using the given refresh token.
   *
   * @param   {string}  refreshToken
   *
   * @return  {string}
   */
  async refreshToken(refreshToken) {
    const result = await this.strategy.refreshToken(refreshToken);
    if (result) {
      return {
        results: await this.userFromToken(result.accessToken),
        meta: {token: result.accessToken, refreshToken: result.refreshToken, refreshTokenExpiresAt: result.refreshTokenExpiresAt},
      };
    }

    container.errorHandlers.loginFailed();
  }

  /**
   * Authorize the logged in user to the given client id.
   *
   * @param   {string}  clientId
   * @param   {string}  authorization
   *
   * @return  {string}
   */
  async authorize(clientId, authorization) {
    const result = await this.strategy.authorize(clientId, authorization);
    if (result) {
      return {
        redirectUri: `${result.redirectUri}?code=${result.authorizationCode}`,
      };
    }

    container.errorHandlers.loginFailed();
  }

  /**
   * Exchange auth code with access token.
   *
   * @param   {string}  code
   * @param   {string}  authorization
   * @param   {string}  redirectUri
   *
   * @return  {string}
   */
  async getToken(code, authorization, redirectUri) {
    const result = await this.strategy.getToken(code, authorization, redirectUri);
    if (result) {
      return {
        results: await this.userFromToken(result.accessToken),
        meta: {token: result.accessToken, refreshToken: result.refreshToken, refreshTokenExpiresAt: result.refreshTokenExpiresAt},
      };
    }

    container.errorHandlers.loginFailed();
  }

  /**
   * Get user from the given token.
   *
   * @param   {string}  token
   *
   * @return  {object}
   */
  async userFromToken(token) {
    let user = await this.check({headers: {authorization: `Bearer ${token}`}, method: 'get', query: {}});
    user = await container.userRepository.find(user.id, '[roles.permissions]');
    user = await this.mapUserRoles(user, user.roles);

    return user;
  }

  /**
   * Check the user is authnicated.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {object}
   */
  async check(req, res) {
    try {
      const request = new container.OAuth2Server.Request(req);
      const response = new container.OAuth2Server.Response(res);
      const data = await container.oauth.authenticate(request, response);

      return data.user;
    } catch (err) {
      container.errorHandlers.unAuthorized();
    }
  }

  /**
   * Map permissions for all the given roles.
   *
   * @param   {object} user
   * @param   {object} roles
   *
   * @return  {string}
   */
  async mapUserRoles(user, roles) {
    for (let index = 0; index < roles.length; index++) {
      const role = roles[index];

      /**
       * Map permissions for all user roles.
       */
      user.permissions = user.permissions || [];
      user.permissions = user.permissions.concat(role.permissions);
      delete role.permissions;
    }

    return user;
  }

  /**
   * Check if the given user has the given
   * permissions on the given model.
   *
   * @param   {mixed}  user
   * @param   {string} permissionName
   * @param   {string} model
   *
   * @return  {string}
   */
  async can(user, permissionName, model) {
    user = user || {};
    user.permissions = user.permissions || [];
    const permission = user.permissions.find((permission) => {
      return permission.key === permissionName && permission.model === model;
    });

    if ( ! permission) container.errorHandlers.noPermissions();

    return true;
  }
}

module.exports = Auth;
