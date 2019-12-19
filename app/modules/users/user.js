const Model = container.Model;

/**
 * User class.
 */
class User extends Model {
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
    this.roles = null;
    this.password = null;
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
  static hiddenFields = ['deleted', 'password'];

  /**
   * Specify mapping fields.
   *
   * @return  {object}
   */
  static mappings = {
    id: 'id',
    email: 'email',
    roles: 'roles',
    password: 'password',
    deleted: 'deleted',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  };

  /**
   * Remove hashed password.
   *
   * @param   {string}  value
   *
   * @return  {void}
   */
  setPassword(value) {
    if (container.userModel.isBcryptHash(value)) {
      delete this.password;
    }
  }
}

module.exports = User;
