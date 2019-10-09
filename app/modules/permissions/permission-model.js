const Model = container.Model;

/**
 * Permission model
 */
class PermissionModel extends Model {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static tableName = 'permission';

  /**
   * Return model relations.
   *
   * @return  {object}
   */
  static get relationMappings() {
    return {
      roles: {
        relation: container.Model.ManyToManyRelation,
        modelClass: container.role,
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
