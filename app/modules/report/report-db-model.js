const DBModel = container.DBModel;

/**
 * Report model
 */
class ReportModel extends DBModel {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static tableName = 'report';
}

module.exports = ReportModel;
