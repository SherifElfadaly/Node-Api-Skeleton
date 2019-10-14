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
    this.model = null;
    this.roles = null;
    this.deleted = null;
    this.created_at = null;
    this.updated_at = null;

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
    model: 'model',
    roles: 'roles',
    deleted: 'deleted',
    created_at: 'created_at',
    updated_at: 'updated_at',
  };
}

module.exports = Permission;
