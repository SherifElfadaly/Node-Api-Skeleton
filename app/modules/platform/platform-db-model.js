const DBModel = container.DBModel;

/**
 * PlatformModel model
 */
class PlatformModel extends DBModel {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static tableName = 'platform';

  /**
   * Return model relations.
   *
   * @return  {object}
   */
  static get relationMappings() {
    return {
      screens: {
        relation: DBModel.HasManyRelation,
        modelClass: container.screen,
        join: {
          from: 'platform.id',
          to: 'screen.platform_id',
        },
      },
    };
  }
}

module.exports = PlatformModel;
