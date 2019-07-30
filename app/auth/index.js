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
    const user = await this.strategy.checkCredentials(email, password);
    if (user) {
      return await container.jwt.sign({id: user.id}, container.config.app_secret,
          {expiresIn: container.config.token_expires_in * 60});
    }

    container.errorHandlers.loginFailed();
  }

  /**
   * Check the user is authnicated.
   *
   * @param   {string}  token
   *
   * @return  {object}
   */
  async check(token) {
    try {
      if (token.startsWith('Bearer ')) token = token.slice(7, token.length);
      return await container.jwt.verify(token, container.config.app_secret);
    } catch (err) {
      container.errorHandlers.unAuthorized();
    }
  }

  /**
   * Check if the given user has the given
   * permissions on the given model.
   *
   * @param   {integer} userId
   * @param   {string}  permissionName
   * @param   {string}  model
   *
   * @return  {string}
   */
  async can(userId, permissionName, model) {
    const user = await container.userRepository.find(userId, `[roles.permissions]`);
    let permissions = [];

    user.roles.forEach((role) => {
      permissions = permissions.concat(role.permissions);
    });

    const permission = permissions.find((permission) => {
      return permission.key === permissionName && permission.model === model;
    });

    if ( ! permission) container.errorHandlers.noPermissions();

    return true;
  }
}

module.exports = Auth;
