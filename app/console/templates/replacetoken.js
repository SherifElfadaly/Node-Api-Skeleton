const Model = container.Model;

/**
 * replacetoken class.
 */
class replacetoken extends Model {
  /**
    * Create new replacetoken
    *
    * @param   {object}  model
    *
    * @return  {void}
    */
  constructor(model) {
    super(model);

    this.id = null;
    /** Add attributes here **/
    this.deleted = null;
    this.createdAt = null;
    this.updatedAt = null;

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
  hiddenFields = ['deleted'];

  /**
   * Specify mapping fields.
   *
   * @return  {object}
   */
  mappings = {
    id: 'id',
    /** Add attributes here **/
    deleted: 'deleted',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  };
}

module.exports = replacetoken;
