const Controller = container.controller;

/**
 * User Controller
 */
class UserController extends Controller {
  /**
   * Init new object
   *
   * @param   {object}  userRepository
   *
   * @return  {void}
   */
  constructor(userRepository) {
    super(userRepository);
  }
}

module.exports = UserController;
