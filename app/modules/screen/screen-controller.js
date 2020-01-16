const Controller = container.controller;

/**
 * ScreenController Controller
 */
class ScreenController extends Controller {
  /**
   * Specify methods that will not be checked
   * for login.
   *
   * @return  {array}
   */
  static skipLoginCheck = [];

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
   * Fetch all records from the repo.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {array}
   */
  async all(req, res) {
    return res.json(await this.repo.all(req.platform, this.getModuleConfig('relations', 'all'), req.headers['sort-by'], req.headers['desc']));
  }
}

module.exports = ScreenController;
