const Model = container.Model;

/**
 * OuathClient Model.
 */
class OuathClientModel extends Model {
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
      oauthCodes: {
        relation: container.Model.HasManyRelation,
        modelClass: container.oauthCode,
        join: {
          from: 'oauth_client.id',
          to: 'oauth_auth_token.user_id',
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

module.exports = OuathClientModel;
