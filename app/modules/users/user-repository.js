const Repository = container.repository;

/**
 * User repository
 */
class UserRepository extends Repository {
  /**
   * Init new object
   *
   * @param   {object}  model
   *
   * @return  {void}
   */
  constructor(model) {
    super(model);
  }

  /**
   * Login using the given credentials.
   *
   * @param   {string}  email
   * @param   {string}  password
   *
   * @return  {object}
   */
  async login(email, password) {
    return container.auth.attempt(email, password);
  }

  /**
   * Assign role for the given user.
   *
   * @param   {object} data
   * @param   {object} trx
   * @param   {string} allowedRelations
   * @param   {object} upsertOptions
   *
   * @return  {object}
   */
  async assignRole(data, trx, allowedRelations = '[]', upsertOptions = {}) {
    data.roles = [data.role];
    return this.update(data, allowedRelations, upsertOptions, trx);
  }

  /**
   * Change password for the logged in user.
   *
   * @param   {object} user
   * @param   {string} password
   * @param   {string} oldPassword
   * @param   {object} trx
   *
   * @return  {object}
   */
  async changePassword(user, password, oldPassword, trx) {
    if (await container.auth.checkCredentials(user.email, oldPassword)) {
      return this.update({id: user.id, password: password}, '[]', {}, trx);
    }

    container.errorHandlers.loginFailed();
  }

  /**
   * Send confirm email for the given user.
   *
   * @param   {number} id
   *
   * @return  {void}
   */
  async sendConfirmEmail(id) {
    const user = await this.find(id);
    const token = await container.jwt.sign({email: user.email}, container.config.app_secret, {expiresIn: container.config.reset_token_expires_in * 60});
    container.mail.send(user.email, 'Confirm your email', {url: `${container.config.confirm_url}?token=${token}`}, 'confirm-email');
  }

  /**
   * Send reset password email.
   *
   * @param   {string} email
   *
   * @return  {void}
   */
  async forgotPassword(email) {
    const token = await container.jwt.sign({email: email}, container.config.app_secret, {expiresIn: container.config.reset_token_expires_in * 60});
    container.mail.send(email, 'Reset your password', {url: `${container.config.reset_url}?token=${token}`}, 'forgot-password');
  }

  /**
   * Reset password using the forgot token.
   *
   * @param   {string} token
   * @param   {string} password
   * @param   {object} trx
   *
   * @return  {object}
   */
  async resetPassword(token, password, trx) {
    token = await container.jwt.verify(token, container.config.app_secret);
    const user = await this.first({email: token.email});
    return this.update({id: user.id, confirmed: 1, password: password}, '[]', {}, trx);
  }

  /**
   * Update profile.
   *
   * @param   {object} user
   * @param   {array}  data
   * @param   {object} trx
   * @param   {string} allowedRelations
   * @param   {object} upsertOptions
   *
   * @return  {object}
   */
  async updateProfile(user, data, trx, allowedRelations = '[]', upsertOptions = {}) {
    data.id = user.id;
    return this.update(data, allowedRelations, upsertOptions, trx);
  }
}

module.exports = UserRepository;
