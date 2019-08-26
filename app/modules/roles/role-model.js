const Model = container.Model;

/**
 * roleModel model
 */
class roleModel extends Model {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static tableName = 'roles';

  /**
   * Specify fields that will be hidden
   * from json object.
   *
   * @return  {array}
   */
  static hiddenFields = ['deleted'];

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
    const permissionModel = require('../permissions/permission-model');
    const userModel = require('../users/user-model');
    return {
      users: {
        relation: container.Model.ManyToManyRelation,
        modelClass: userModel,
        join: {
          from: 'roles.id',
          through: {
            from: 'users_roles.role_id',
            to: 'users_roles.user_id',
          },
          to: 'users.id',
        },
      },
      permissions: {
        relation: container.Model.ManyToManyRelation,
        modelClass: permissionModel,
        join: {
          from: 'roles.id',
          through: {
            from: 'roles_permissions.role_id',
            to: 'roles_permissions.permission_id',
          },
          to: 'permissions.id',
        },
      },
    };
  }
}

module.exports = roleModel;
