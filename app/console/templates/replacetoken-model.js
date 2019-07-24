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
  hiddenFields = ['deleted'];
}

module.exports = replacetoken;
