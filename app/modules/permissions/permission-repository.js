const Repository = container.repository;

/**
 * PermissionRepository repository
 */
class PermissionRepository extends Repository {
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

module.exports = PermissionRepository;
