const Model = container.Model;

/**
 * RefreshToken Model.
 */
class RefreshTokenModel extends Model {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static tableName = 'oauth_refresh_token';

  /**
   * Define all related models.
   *
   * @return  {object}
   */
  static get relationMappings() {
    return {
      accessToken: {
        relation: container.Model.BelongsToOneRelation,
        modelClass: container.accessToken,
        join: {
          from: 'oauth_refresh_token.access_token',
          to: 'user.id',
        },
      },
    };
  }
}

module.exports = RefreshTokenModel;
