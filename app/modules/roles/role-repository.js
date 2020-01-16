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

  /**
   * Assign screen permissoin to the given role.
   *
   * @param   {object} role
   * @param   {object} trx
   * @param   {string} allowedRelations
   * @param   {object} upsertOptions
   *
   * @return  {object}
   */
  async assignScreenPermission(role, trx, allowedRelations = '[]', upsertOptions = {}) {
    const uniquePermissions = {};
    const permissions = [];
    role.screenPermissions.forEach((screenPermission) => {
      if ( ! uniquePermissions[screenPermission.permission.id]) permissions.push(screenPermission.permission);
      uniquePermissions[screenPermission.permission.id] = screenPermission.permission;
    });

    role.permissions = permissions;

    return this.update(role, allowedRelations, upsertOptions, trx);
  }
}

module.exports = roleRepository;
