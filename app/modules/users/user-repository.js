/**
 * User repo
 */
class UserRepository {
  /**
   * Init new object
   *
   * @param   {object}  userModel
   *
   * @return  {void}
   */
  constructor(userModel) {
    this.user = userModel;
  }

  /**
   * Return all users
   *
   * @return  {object}
   */
  async all() {
    return await this.user.query();
  }

  /**
   * find user by id
   *
   * @param   {number}  id
   *
   * @return  {object}
   */
  async find(id) {
    return await this.user.query().findById(id);
  }
}

module.exports = UserRepository;
