const password = require('objection-password')();
const DBModel = password(container.DBModel);

/**
 * User model.
 */
class UserModel extends DBModel {
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
        relation: DBModel.ManyToManyRelation,
        modelClass: container.role,
        join: {
          from: 'user.id',
          through: {
            from: 'user_role.user_id',
            to: 'user_role.role_id',
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
      authCodes: {
        relation: container.Model.HasManyRelation,
        modelClass: container.authCode,
        join: {
          from: 'user.id',
          to: 'oauth_auth_code.user_id',
        },
      },
      oauthClients: {
        relation: container.Model.HasManyRelation,
        modelClass: container.oauthClient,
        join: {
          from: 'user.id',
          to: 'oauth_client.user_id',
        },
      },
    };
  }
}

module.exports = UserModel;
