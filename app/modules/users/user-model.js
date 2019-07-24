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
    groups: {
      relation: container.Model.ManyToManyRelation,
      modelClass: container.groupModel,
      join: {
        from: 'users.id',
        through: {
          from: 'users_groups.user_id',
          to: 'users_groups.group_id',
        },
        to: 'groups.id',
      },
    },
  }
}

module.exports = User;
