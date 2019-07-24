const Model = container.Model;

/**
 * GroupModel model
 */
class GroupModel extends Model {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static tableName = 'groups';

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
    users: {
      relation: container.Model.ManyToManyRelation,
      modelClass: container.userModel,
      join: {
        from: 'groups.id',
        through: {
          from: 'users_groups.group_id',
          to: 'users_groups.user_id',
        },
        to: 'users.id',
      },
    },
    permissions: {
      relation: container.Model.ManyToManyRelation,
      modelClass: container.permissionModel,
      join: {
        from: 'groups.id',
        through: {
          from: 'groups_permissions.group_id',
          to: 'groups_permissions.permission_id',
        },
        to: 'permissions.id',
      },
    },
  }
}

module.exports = GroupModel;
