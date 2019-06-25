const Model = container.Model;

/**
 * User model
 */
class User extends Model {
  /**
   * Return table name for this model.
   *
   * @return  {string}
   */
  static get tableName() {
    return 'users';
  }

  /**
   * Set created at before insert.
   *
   * @param   {object}  context
   *
   * @return  {void}
   */
  $beforeInsert(context) {
    this.created_at = container.moment().format('YYYY-MM-DD hh:mm:ss');
    super.$beforeInsert(context);
  }

  /**
   * Set updated at before update.
   *
   * @param   {object}  queryOptions
   * @param   {object}  context
   *
   * @return  {void}
   */
  $beforeUpdate(queryOptions, context) {
    this.updated_at = container.moment().format('YYYY-MM-DD hh:mm:ss');
    super.$beforeUpdate(queryOptions, context);
  }
}

module.exports = User;
