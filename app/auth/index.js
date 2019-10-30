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
  async attempt(email, password) {
    const result = await this.strategy.checkCredentials(email, password);
    if (result) {
      return {
        results: await this.check({headers: {authorization: `Bearer ${result.accessToken}`}, method: 'get', query: {}}),
        meta: {token: result.accessToken, refreshToken: result.refreshToken, refreshTokenExpiresAt: result.refreshTokenExpiresAt},
      };
    }

    container.errorHandlers.loginFailed();
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

      /**
       * Fetch the user with hsi roles and permissions.
       *
       * @return  {object}
       */
      const user = await container.userRepository.find(data.user.id, '[roles.permissions]');

      /**
       * Map permissions for all user roles.
       */
      user.roles.map((role) => {
        user.permissions = user.permissions || [];
        user.permissions = user.permissions.concat(role.permissions);
        delete role.permissions;
      });

      return user;
    } catch (err) {
      container.errorHandlers.unAuthorized();
    }
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
    user.permissions = user.permissions || [];
    const permission = user.permissions.find((permission) => {
      return permission.key === permissionName && permission.model === model;
    });

    if ( ! permission) container.errorHandlers.noPermissions();

    return true;
  }
}

module.exports = Auth;
