const Repository = container.repository;

/**
 * roleRepository repository
 */
class roleRepository extends Repository {
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

module.exports = roleRepository;
