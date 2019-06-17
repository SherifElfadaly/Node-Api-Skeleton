const DB = container.DB;

/**
 * User model
 */
class User extends DB {
  /**
   * Init new object
   *
   * @return  {void}
   */
  constructor() {
    super('users');
  }
}

module.exports = User;
