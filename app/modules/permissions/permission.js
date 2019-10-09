const Mapper = container.Mapper;

/**
 * Permission class.
 */
class Permission extends Mapper {
  /**
    * Create new permission
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
    this.roles = null;
    this.deleted = null;
    this.createdAt = null;
    this.updatedAt = null;

    return model;
  }

  /**
   * Specify fields that will be hidden
   * from the model.
   *
   * @return  {array}
   */
  hiddenFields = ['deleted'];

  /**
   * Specify mapping fields.
   *
   * @return  {object}
   */
  mappings = {
    id: 'id',
    name: 'name',
    key: 'key',
    roles: 'roles',
    deleted: 'deleted',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  };
}

module.exports = Permission;
