const Controller = container.controller;

/**
 * User Controller
 */
class UserController extends Controller {
  /**
   * Specify methods that will not be checked
   * for login.
   *
   * @return  {array}
   */
  static skipLoginCheck = ['login', 'forgotPassword', 'resetPassword'];

  /**
   * Specify methods that will not be checked
   * for permissions.
   *
   * @return  {array}
   */
  static skipPermissionCheck = ['changePassword', 'updateProfile'];

  /**
   * Init new object
   *
   * @param   {object}  repository
   *
   * @return  {void}
   */
  constructor(repository) {
    super(repository);
  }

  /**
   * Login using the given credentials.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {object}
   */
  async login(req, res) {
    return res.json(await this.repo.login(req.body.email, req.body.password));
  }

  /**
   * Assign role to the given user.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {object}
   */
  async assignRole(req, res) {
    return res.json(await this.repo.assignRole(req.body, req.trx,
        this.getModuleConfig('allowedRelations', 'assignRole'), this.getModuleConfig('upsertOptions', 'assignRole')));
  }

  /**
   * Reset password for the given user.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {object}
   */
  async resetUserPassword(req, res) {
    return res.json(await this.repo.update(req.body,
        this.getModuleConfig('allowedRelations', 'resetUserPassword'), this.getModuleConfig('upsertOptions', 'resetUserPassword')));
  }

  /**
   * Change password for the logged in user.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {object}
   */
  async changePassword(req, res) {
    return res.json(await this.repo.changePassword(req.user, req.body.password, req.body.old_password, req.trx));
  }

  /**
   * Send reset password email.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {object}
   */
  async forgotPassword(req, res) {
    return res.json(await this.repo.forgotPassword(req.body.email));
  }

  /**
   * Send confirm email mail.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {object}
   */
  async sendConfirmEmail(req, res) {
    return res.json(await this.repo.sendConfirmEmail(req.body.id));
  }

  /**
   * Reset password using the forgot token.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {object}
   */
  async resetPassword(req, res) {
    return res.json(await this.repo.resetPassword(req.body.token, req.body.password, req.trx));
  }

  /**
   * Update profile.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {object}
   */
  async updateProfile(req, res) {
    return res.json(await this.repo.updateProfile(req.user, req.body, req.trx,
        this.getModuleConfig('allowedRelations', 'updateProfile'), this.getModuleConfig('upsertOptions', 'updateProfile')));
  }
}

module.exports = UserController;
