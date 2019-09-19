const Controller = container.controller;

/**
 * ReportController Controller
 */
class ReportController extends Controller {
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
  static skipPermissionCheck = ['getReport'];

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
    * Find report by the given name.
    *
    * @param   {object}  req
    * @param   {object}  res
    *
    * @return  {object}
    */
  async getReport(req, res) {
    return res.json(await this.repo.getReport(
        req.user,
        req.params.reportName,
        req.body,
        req.params.page,
        req.params.perPage,
        req.headers['sort-by'],
        req.headers['desc'])
    );
  }
}

module.exports = ReportController;
