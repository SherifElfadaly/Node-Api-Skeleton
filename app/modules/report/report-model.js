const Model = container.Model;

/**
 * Report model
 */
class Report extends Model {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static tableName = 'report';

  /**
   * Specify fields that will be hidden
   * from json object.
   *
   * @return  {array}
   */
  static hiddenFields = ['deleted'];

  /**
   * Specify foreign keys that will not be hidden
   * from json object.
   *
   * @return  {array}
   */
  static allowedForeigns = [];
}

module.exports = Report;
