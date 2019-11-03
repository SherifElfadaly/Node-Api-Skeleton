const Model = container.Model;

/**
 * OauthClient class.
 */
class OauthClient extends Model {
  /**
    * Create new OauthClient
    *
    * @param   {object}  model
    *
    * @return  {void}
    */
  constructor(model) {
    super(model);

    this.id = null;
    this.name = null;
    this.secret = null;
    this.redirect = null;
    this.revoked = null;
    this.user = null;
    this.deleted = null;
    this.created_at = null;
    this.updated_at = null;

    return model;
  }

  /**
   * Specify fields that will be hidden
   * from the model.
   *
   * @return  {array}
   */
  hiddenFields = ['deleted'];

  /**
   * Specify mapping fields.
   *
   * @return  {object}
   */
  mappings = {
    id: 'id',
    name: 'name',
    secret: 'secret',
    redirect: 'redirect',
    revoked: 'revoked',
    user: 'user',
    deleted: 'deleted',
    created_at: 'created_at',
    updated_at: 'updated_at',
  };
}

module.exports = OauthClient;
