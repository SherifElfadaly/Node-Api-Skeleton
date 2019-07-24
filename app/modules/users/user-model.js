const password = require('objection-password')();
const Model = password(container.Model);

/**
 * User model
 */
class User extends Model {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static get tableName() {
    return 'users';
  }

  /**
   * Specify fields that will be hidden
   * from json object.
   *
   * @return  {array}
   */
  get hiddenFields() {
    return ['deleted', 'password'];
  }
}

module.exports = User;
