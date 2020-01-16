const Controller = container.controller;

/**
 * roleController Controller
 */
class roleController extends Controller {
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
   * Assign screen permission to the given role.
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {object}
   */
  async assignScreenPermission(req, res) {
    return res.json(await this.repo.assignScreenPermission(req.body, req.trx,
        this.getModuleConfig('allowedRelations', 'assignScreenPermission'), this.getModuleConfig('upsertOptions', 'assignScreenPermission')));
  }
}

module.exports = roleController;
