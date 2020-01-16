const Model = container.Model;

/**
 * ScreenPermission class.
 */
class ScreenPermission extends Model {
  /**
    * Create new ScreenPermission
    *
    * @param   {object}  model
    *
    * @return  {void}
    */
  constructor(model) {
    super(model);

    this.id = null;
    this.name = null;
    this.key = null;
    this.screen = null;
    this.permission = null;
    this.deleted = null;
    this.created_at = null;
    this.updated_at = null;

    return model;
  }

  /**
   * Specify fields that will be not be inserted
   * or updated from the model.
   *
   * @return  {array}
   */
  static unFillable = [];

  /**
   * Specify fields that will be hidden
   * from the model.
   *
   * @return  {array}
   */
  static hiddenFields = ['deleted'];

  /**
   * Specify mapping fields.
   *
   * @return  {object}
   */
  static mappings = {
    id: 'id',
    name: 'name',
    key: 'key',
    screen: 'screen',
    permission: 'permission',
    deleted: 'deleted',
    created_at: 'created_at',
    updated_at: 'updated_at',
  };
}

module.exports = ScreenPermission;
