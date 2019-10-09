const Mapper = container.Mapper;

/**
 * User class.
 */
class User extends Mapper {
  /**
    * Create new user
    *
    * @param   {object}  model
    *
    * @return  {void}
    */
  constructor(model) {
    super(model);

    this.id = null;
    this.email = null;
    this.password = null;
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
  hiddenFields = ['deleted', 'password'];

  /**
   * Specify mapping fields.
   *
   * @return  {object}
   */
  mappings = {
    id: 'id',
    email: 'email',
    password: 'password',
    roles: 'roles',
    deleted: 'deleted',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  };
}

module.exports = User;
