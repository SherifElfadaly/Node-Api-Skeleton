const Repository = container.repository;

/**
 * OauthClientRepository repository
 */
class OauthClientRepository extends Repository {
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
}

module.exports = OauthClientRepository;
