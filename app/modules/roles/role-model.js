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
  static tableName = 'role';

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
      users: {
        relation: container.Model.ManyToManyRelation,
        modelClass: container.userModel,
        join: {
          from: 'role.id',
          through: {
            from: 'user_role.role_id',
            to: 'user_role.user_id',
          },
          to: 'user.id',
        },
      },
      permissions: {
        relation: container.Model.ManyToManyRelation,
        modelClass: container.permissionModel,
        join: {
          from: 'role.id',
          through: {
            from: 'role_permission.role_id',
            to: 'role_permission.permission_id',
          },
          to: 'permission.id',
        },
      },
    };
  }
}

module.exports = roleModel;
