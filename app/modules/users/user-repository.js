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
   *
   * @return  {object}
   */
  async login(email, password) {
    return container.auth.attempt(email, password);
  }

  /**
   * Refresh access token using the given refresh token.
   *
   * @param   {string}  token
   *
   * @return  {object}
   */
  async refreshToken(token) {
    return container.auth.refreshToken(token);
  }
}

module.exports = UserRepository;
