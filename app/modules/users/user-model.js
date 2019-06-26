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
    // eslint-disable-next-line no-undef
    return Promise.resolve(super.$beforeInsert(context)).then(() => {
      this.created_at = container.moment().format('YYYY-MM-DD hh:mm:ss');
    });
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
    // eslint-disable-next-line no-undef
    return Promise.resolve(super.$beforeUpdate(queryOptions, context)).then(() => {
      this.updated_at = container.moment().format('YYYY-MM-DD hh:mm:ss');
    });
  }
}

module.exports = User;
