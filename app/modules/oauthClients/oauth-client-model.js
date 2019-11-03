const DBModel = container.DBModel;

/**
 * OauthClient Model.
 */
class OauthClientModel extends DBModel {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static tableName = 'oauth_client';

  /**
   * Define all related models.
   *
   * @return  {object}
   */
  static get relationMappings() {
    return {
      user: {
        relation: container.Model.BelongsToOneRelation,
        modelClass: container.oauthClient,
        join: {
          from: 'oauth_client.user_id',
          to: 'user.id',
        },
      },
      authCodes: {
        relation: container.Model.HasManyRelation,
        modelClass: container.authCode,
        join: {
          from: 'oauth_client.id',
          to: 'oauth_auth_code.user_id',
        },
      },
      oauthClients: {
        relation: container.Model.HasManyRelation,
        modelClass: container.oauthClient,
        join: {
          from: 'oauth_client.id',
          to: 'oauth_client.client_id',
        },
      },
    };
  }
}

module.exports = OauthClientModel;
