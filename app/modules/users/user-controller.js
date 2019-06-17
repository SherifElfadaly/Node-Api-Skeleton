/**
 * public vairable hold the repo for express route to work.
 *
 * @var  {string}
 */
let repo;

/**
 * User Controller
 */
class UserController {
  /**
   * Init new object
   *
   * @param   {object}  userRepository
   *
   * @return  {void}
   */
  constructor(userRepository) {
    repo = this.repo = userRepository;
  }

  /**
   * Return all users
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {void}
   */
  async all(req, res) {
    return res.json(await repo.all());
  }

  /**
   * find user by id
   *
   * @param   {object}  req
   * @param   {object}  res
   *
   * @return  {void}
   */
  async find(req, res) {
    return res.json(await repo.find(req.params.id));
  }
}

module.exports = UserController;
