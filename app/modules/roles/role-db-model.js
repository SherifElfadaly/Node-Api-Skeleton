const DBModel = container.DBModel;

/**
 * Role model
 */
class RoleModel extends DBModel {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static tableName = 'role';

  /**
   * Return model relations.
   *
   * @return  {object}
   */
  static get relationMappings() {
    return {
      users: {
        relation: DBModel.ManyToManyRelation,
        modelClass: container.user,
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
        relation: DBModel.ManyToManyRelation,
        modelClass: container.permission,
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

module.exports = RoleModel;
