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
  static skipLoginCheck = ['login', 'refreshToken', 'getToken'];

  /**
   * Specify methods that will not be checked
   * for permissions.
   *
   * @return  {array}
   */
  static skipPermissionCheck = ['authorize'];

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
   * Refresh access token using the given refresh token.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {object}
   */
  async refreshToken(req, res) {
    return res.json(await this.repo.refreshToken(req.body.refreshToken));
  }

  /**
   * Authorize the logged in user to the given client id.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {object}
   */
  async authorize(req, res) {
    return res.json(await this.repo.authorize(req.query.client_id, req.headers.authorization));
  }

  /**
   * Exchange auth code with access token.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {object}
   */
  async getToken(req, res) {
    return res.json(await this.repo.getToken(req.body.code, req.body.authorization, req.body.redirectUri));
  }
}

module.exports = UserController;
