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
  static tableName = 'permission';

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
    return {
      roles: {
        relation: container.Model.ManyToManyRelation,
        modelClass: container.roleModel,
        join: {
          from: 'permission.id',
          through: {
            from: 'role_permission.permission_id',
            to: 'role_permission.role_id',
          },
          to: 'role.id',
        },
      },
    };
  }
}

module.exports = PermissionModel;
