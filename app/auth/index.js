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
   * @param   {object}  trx
   *
   * @return  {string}
   */
  async attempt(email, password, trx) {
    let user = await this.strategy.checkCredentials(email, password, trx);
    if (user) {
      const token = await container.jwt.sign({id: user.id}, container.config.app_secret,
          {expiresIn: container.config.token_expires_in * 60});
      user = await this.check(token, trx);

      return {results: user, meta: {token: token}};
    }

    container.errorHandlers.loginFailed();
  }

  /**
   * Check the user is authnicated.
   *
   * @param   {string}  token
   * @param   {object}  trx
   *
   * @return  {object}
   */
  async check(token, trx) {
    try {
      if (token.startsWith('Bearer ')) token = token.slice(7, token.length);
      let user = await container.jwt.verify(token, container.config.app_secret);

      /**
       * Fetch the user with hsi roles and permissions.
       *
       * @return  {object}
       */
      user = await container.userRepository.find(user.id, '[roles.permissions]', '*', trx);

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
