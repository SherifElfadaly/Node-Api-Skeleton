const Repository = container.repository;

/**
 * User repository
 */
class UserRepository extends Repository {
  /**
   * Init new object
   *
   * @param   {object}  model
   *
   * @return  {void}
   */
  constructor(model) {
    super(model);
  }

  /**
   * Login using the given credentials.
   *
   * @param   {string}  email
   * @param   {string}  password
   * @param   {object}  trx
   *
   * @return  {object}
   */
  async login(email, password, trx) {
    return container.auth.attempt(email, password, trx);
  }
}

module.exports = UserRepository;
