const Model = container.Model;

/**
 * replacetoken model
 */
class replacetoken extends Model {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static tableName = 'databasetoken';

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

module.exports = replacetoken;
