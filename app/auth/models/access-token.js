const Model = container.Model;

/**
 * AccessToken Model.
 */
class AccessTokenModel extends Model {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static tableName = 'oauth_access_token';

  /**
   * Define all related models.
   *
   * @return  {object}
   */
  static get relationMappings() {
    return {
      user: {
        relation: container.Model.BelongsToOneRelation,
        modelClass: container.user,
        join: {
          from: 'oauth_access_token.user_id',
          to: 'user.id',
        },
      },
      client: {
        relation: container.Model.BelongsToOneRelation,
        modelClass: container.oauthClient,
        join: {
          from: 'oauth_access_token.client_id',
          to: 'oauth_client.id',
        },
      },
    };
  }
}

module.exports = AccessTokenModel;
