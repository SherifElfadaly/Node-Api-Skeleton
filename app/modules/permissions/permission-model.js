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
   * Return model relations.
   *
   * @return  {object}
   */
  static relationMappings = {
    groups: {
      relation: container.Model.ManyToManyRelation,
      modelClass: container.permissionModel,
      join: {
        from: 'permissions.id',
        through: {
          from: 'groups_permissions.permission_id',
          to: 'groups_permissions.group_id',
        },
        to: 'groups.id',
      },
    },
  }
}

module.exports = PermissionModel;
