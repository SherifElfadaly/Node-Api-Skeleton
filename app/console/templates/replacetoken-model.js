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
  static get tableName() {
    return 'databasetoken';
  }

  /**
   * Specify fields that will be hidden
   * from json object.
   *
   * @return  {array}
   */
  get hiddenFields() {
    return ['deleted'];
  }
}

module.exports = replacetoken;
