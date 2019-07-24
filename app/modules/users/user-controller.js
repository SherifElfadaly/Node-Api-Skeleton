const Controller = container.controller;

/**
 * User Controller
 */
class UserController extends Controller {
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
}

module.exports = UserController;
