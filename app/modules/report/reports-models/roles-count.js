const Mapper = container.Mapper;

/**
 * RolesCount class.
 */
class RolesCount extends Mapper {
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
   * Specify fields that will be hidden
   * from the model.
   *
   * @return  {array}
   */
  hiddenFields = [];

  /**
   * Specify mapping fields.
   *
   * @return  {object}
   */
  mappings = {
    role: 'role',
    count: 'count',
  };
}

module.exports = RolesCount;
