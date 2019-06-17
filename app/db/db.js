/**
 * DB Factory
 */
class DB {
  /**
   * Init new object.
   *
   * @param   {object}  config
   *
   * @return  {void}
   */
  constructor(config) {
    this.config = config;
  }
  /**
   * Get DB driver based on the config.
   *
   * @return  {object}
   */
  getDriver() {
    return require('./drivers/' + this.config.db_driver);
  }
}

module.exports = DB;
