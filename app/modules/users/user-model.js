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
  static tableName = 'users';

  /**
   * Specify fields that will be hidden
   * from json object.
   *
   * @return  {array}
   */
  static hiddenFields = ['deleted', 'password'];

  static relationMappings = {
    roles: {
      relation: container.Model.ManyToManyRelation,
      modelClass: container.roleModel,
      join: {
        from: 'users.id',
        through: {
          from: 'users_roles.user_id',
          to: 'users_roles.role_id',
        },
        to: 'roles.id',
      },
    },
  }
}

module.exports = User;
