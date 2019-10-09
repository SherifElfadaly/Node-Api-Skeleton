const Mapper = container.Mapper;

/**
 * replacetoken class.
 */
class replacetoken extends Mapper {
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
    /** Add attributes here **/
    deleted: 'deleted',
    created_at: 'created_at',
    updated_at: 'updated_at',
  };
}

module.exports = replacetoken;
