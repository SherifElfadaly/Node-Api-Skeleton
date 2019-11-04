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
  login(email, password) {
    return container.auth.attempt(email, password);
  }

  /**
   * Refresh access token using the given refresh token.
   *
   * @param   {string}  token
   *
   * @return  {object}
   */
  refreshToken(token) {
    return container.auth.refreshToken(token);
  }

  /**
   * Authorize the logged in user to the given client id.
   *
   * @param   {string}  clientId
   * @param   {string}  authorization
   *
   * @return  {object}
   */
  authorize(clientId, authorization) {
    return container.auth.authorize(clientId, authorization);
  }

  /**
   * Exchange auth code with access token.
   *
   * @param   {string}  code
   * @param   {string}  authorization
   * @param   {string}  redirectUri
   *
   * @return  {object}
   */
  getToken(code, authorization, redirectUri) {
    return container.auth.getToken(code, authorization, redirectUri);
  }
}

module.exports = UserRepository;
