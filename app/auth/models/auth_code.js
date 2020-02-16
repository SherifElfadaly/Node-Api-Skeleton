const DBModel = container.DBModel;

/**
 * AuthCode Model.
 */
class AuthCodeModel extends DBModel {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static tableName = 'oauth_auth_code';

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
          from: 'oauth_auth_code.user_id',
          to: 'user.id',
        },
      },
      client: {
        relation: container.Model.BelongsToOneRelation,
        modelClass: container.oauthClient,
        join: {
          from: 'oauth_auth_code.client_id',
          to: 'oauth_client.id',
        },
      },
    };
  }
}

module.exports = AuthCodeModel;
