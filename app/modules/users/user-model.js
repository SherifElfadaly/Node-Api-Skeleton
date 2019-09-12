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
  static tableName = 'user';

  /**
   * Specify fields that will be hidden
   * from json object.
   *
   * @return  {array}
   */
  static hiddenFields = ['deleted', 'password'];

  /**
   * Specify foreign keys that will not be hidden
   * from json object.
   *
   * @return  {array}
   */
  static allowedForeigns = [];

  /**
   * Return model relations.
   *
   * @return  {object}
   */
  static get relationMappings() {
    return {
      roles: {
        relation: container.Model.ManyToManyRelation,
        modelClass: container.roleModel,
        join: {
          from: 'user.id',
          through: {
            from: 'user_role.user_id',
            to: 'user_role.role_id',
            extra: ['created_at', 'updated_at'],
          },
          to: 'role.id',
        },
      },
    };
  }
}

module.exports = User;
