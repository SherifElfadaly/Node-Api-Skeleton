const password = require('objection-password')();
const Model = password(container.Model);

/**
 * User model.
 */
class UserModel extends Model {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static tableName = 'user';

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
          from: 'user.id',
          through: {
            from: 'user_role.user_id',
            to: 'user_role.role_id',
            extra: ['created_at', 'updated_at'],
          },
          to: 'role.id',
        },
      },
      accessTokens: {
        relation: container.Model.HasManyRelation,
        modelClass: container.accessToken,
        join: {
          from: 'user.id',
          to: 'oauth_access_token.user_id',
        },
      },
      oauthCodes: {
        relation: container.Model.HasManyRelation,
        modelClass: container.oauthCode,
        join: {
          from: 'user.id',
          to: 'oauth_auth_token.user_id',
        },
      },
      oauthClients: {
        relation: container.Model.HasManyRelation,
        modelClass: container.oauthClient,
        join: {
          from: 'user.id',
          to: 'oauth_client.client_id',
        },
      },
    };
  }
}

module.exports = UserModel;
