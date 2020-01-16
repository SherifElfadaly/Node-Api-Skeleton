const DBModel = container.DBModel;

/**
 * ScreenPermissionModel model
 */
class ScreenPermissionModel extends DBModel {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static tableName = 'screen_permission';

  /**
   * Return model relations.
   *
   * @return  {object}
   */
  static get relationMappings() {
    return {
      permission: {
        relation: DBModel.BelongsToOneRelation,
        modelClass: container.permission,
        join: {
          from: 'screen_permission.permission_id',
          to: 'permission.id',
        },
      },
      screen: {
        relation: DBModel.BelongsToOneRelation,
        modelClass: container.screen,
        join: {
          from: 'screen_permission.screen_id',
          to: 'screen.id',
        },
      },
    };
  }
}

module.exports = ScreenPermissionModel;
