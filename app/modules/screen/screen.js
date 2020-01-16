const Model = container.Model;

/**
 * Screen class.
 */
class Screen extends Model {
  /**
    * Create new Screen
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
    this.parent_id = null;
    this.subScreens = null;
    this.screenPermissions = null;
    this.platform = null;
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
  static hiddenFields = ['deleted', 'parent_id'];

  /**
   * Specify mapping fields.
   *
   * @return  {object}
   */
  static mappings = {
    id: 'id',
    name: 'name',
    key: 'key',
    parent_id: 'parent_id',
    subScreens: 'subScreens',
    screenPermissions: 'screenPermissions',
    platform: 'platform',
    deleted: 'deleted',
    created_at: 'created_at',
    updated_at: 'updated_at',
  };
}

module.exports = Screen;
