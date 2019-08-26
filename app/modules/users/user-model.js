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
    const roleModel = require('../roles/role-model');
    return {
      roles: {
        relation: container.Model.ManyToManyRelation,
        modelClass: roleModel,
        join: {
          from: 'users.id',
          through: {
            from: 'users_roles.user_id',
            to: 'users_roles.role_id',
            extra: ['system_id', 'department_id', 'created_at', 'updated_at'],
          },
          to: 'roles.id',
        },
      },
    };
  }
}

module.exports = User;
