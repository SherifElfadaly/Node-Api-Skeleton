const Repository = container.repository;

/**
 * OuathClientRepository repository
 */
class OuathClientRepository extends Repository {
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

module.exports = OuathClientRepository;
