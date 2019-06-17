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
    return await this.user.all();
  }

  /**
   * find user by id
   *
   * @param   {number}  id
   *
   * @return  {object}
   */
  async find(id) {
    return await this.user.find(id);
  }
}

module.exports = UserRepository;
