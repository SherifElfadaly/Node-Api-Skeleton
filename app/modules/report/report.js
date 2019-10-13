const Mapper = container.Mapper;

/**
 * Report class.
 */
class Report extends Mapper {
  /**
    * Create new report
    *
    * @param   {object}  model
    *
    * @return  {void}
    */
  constructor(model) {
    super(model);

    this.id = null;
    this.report_name = null;
    this.view_name = null;
    this.deleted = null;
    this.createdAt = null;
    this.updatedAt = null;

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
    report_name: 'report_name',
    view_name: 'view_name',
    deleted: 'deleted',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  };
}

module.exports = Report;