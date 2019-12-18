const Model = container.Model;

/**
 * RolesCount class.
 */
class RolesCount extends Model {
  /**
    * Create new report
    *
    * @param   {object}  model
    *
    * @return  {void}
    */
  constructor(model) {
    super(model);

    this.role = null;
    this.count = null;

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
  static hiddenFields = [];

  /**
   * Specify mapping fields.
   *
   * @return  {object}
   */
  static mappings = {
    role: 'role',
    count: 'count',
  };
}

module.exports = RolesCount;
