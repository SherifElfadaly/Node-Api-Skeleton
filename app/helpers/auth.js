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
    this.user = this.strategy.checkCredentials(email, password);
    if (this.user) {
      return await container.jwt.sign(this.user, container.config.app_secret,
          {expiresIn: container.config.token_expires_in * 60});
    }

    container.errorHandler.loginFailed();
  }

  /**
   * Check the user is authnicated.
   *
   * @param   {string}  token
   *
   * @return  {string}
   */
  async check(token) {
    try {
      return await container.jwt.verify(token, container.config.app_secret);
    } catch (err) {
      container.errorHandlers.unAuthorized();
    }
  }
}

module.exports = Auth;
