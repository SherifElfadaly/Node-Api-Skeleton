const Model = container.Model;

/**
 * Role class.
 */
class Role extends Model {
  /**
    * Create new role
    *
    * @param   {object}  model
    *
    * @return  {void}
    */
  constructor(model) {
    super(model);

    this.id = null;
    this.name = null;
    this.key = null;
    this.users = null;
    this.permissions = null;
    this.assignableRoles = null;
    this.deleted = null;
    this.createdAt = null;
    this.updatedAt = null;

    return model;
  }

  /**
   * Specify fields that will be not be inserted
   * or updated from the model.
   *
   * @return  {array}
   */
  static unFillable = [];

  /**
   * Specify fields that will be hidden
   * from the model.
   *
   * @return  {array}
   */
  static hiddenFields = ['deleted'];

  /**
   * Specify mapping fields.
   *
   * @return  {object}
   */
  static mappings = {
    id: 'id',
    name: 'name',
    key: 'key',
    users: 'users',
    permissions: 'permissions',
    assignableRoles: 'assignable_roles',
    deleted: 'deleted',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  };

  /**
   * Set assignable roles.
   *
   * @param   {string}  value
   *
   * @return  {void}
   */
  setAssignableRoles(value) {
    this.assignableRoles = value.map((e) => e.key).join(',');
  }

  /**
   * get assignable roles.
   *
   * @param   {string}  value
   *
   * @return  {void}
   */
  getAssignableRoles(value) {
    this.assignableRoles = value ? value.split(',') : [];

    this.assignableRoles = this.assignableRoles.map((assignableRole) => {
      return {key: assignableRole};
    });
  }
}

module.exports = Role;
