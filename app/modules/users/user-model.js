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
   */
  $beforeInsert() {
    this.created_at = container.moment().format('YYYY-MM-DD hh:mm:ss');
    super.$beforeInsert();
  }

  /**
   * Set updated at before update.
   */
  $beforeUpdate() {
    this.updated_at = container.moment().format('YYYY-MM-DD hh:mm:ss');
    super.$beforeUpdate();
  }
}

module.exports = User;
