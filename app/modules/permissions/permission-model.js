const Model = container.Model;

/**
 * PermissionModel model
 */
class PermissionModel extends Model {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static tableName = 'permissions';

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
  static relationMappings = {
    roles: {
      relation: container.Model.ManyToManyRelation,
      modelClass: container.permissionModel,
      join: {
        from: 'permissions.id',
        through: {
          from: 'roles_permissions.permission_id',
          to: 'roles_permissions.role_id',
        },
        to: 'roles.id',
      },
    },
  }
}

module.exports = PermissionModel;
