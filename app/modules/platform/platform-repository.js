const Repository = container.repository;

/**
 * PlatformRepository repository
 */
class PlatformRepository extends Repository {
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

module.exports = PlatformRepository;
