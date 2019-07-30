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
  static skipLoginCheck = ['login'];

  /**
   * Specify methods that will not be checked
   * for permissions.
   *
   * @return  {array}
   */
  static skipPermissionCheck = [];

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
}

module.exports = UserController;
