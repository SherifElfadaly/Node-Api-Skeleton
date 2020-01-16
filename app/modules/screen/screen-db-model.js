const DBModel = container.DBModel;

/**
 * ScreenModel model
 */
class ScreenModel extends DBModel {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static tableName = 'screen';

  /**
   * Return model relations.
   *
   * @return  {object}
   */
  static get relationMappings() {
    return {
      subScreens: {
        relation: DBModel.HasManyRelation,
        modelClass: container.screen,
        join: {
          from: 'screen.id',
          to: 'screen.parent_id',
        },
      },
      screenPermissions: {
        relation: DBModel.HasManyRelation,
        modelClass: container.screenPermission,
        join: {
          from: 'screen.id',
          to: 'screen_permission.screen_id',
        },
      },
      platform: {
        relation: DBModel.BelongsToOneRelation,
        modelClass: container.platform,
        join: {
          from: 'screen.platform_id',
          to: 'platform.id',
        },
      },
    };
  }
}

module.exports = ScreenModel;
