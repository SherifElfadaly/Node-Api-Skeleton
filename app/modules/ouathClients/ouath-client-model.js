const Model = container.Model;

/**
 * OuathClientModel model
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
    };
  }
}

module.exports = OuathClientModel;
