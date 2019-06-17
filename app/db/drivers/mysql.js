/**
 * Mysql adapter
 */
class MysqlAdapter {
  /**
     * Init new object.
     *
     * @param   {string}  modelName
     * @param   {object}  config
     * @param   {mysql}   mysql
     * @param   {util}    util
     *
     * @return  {void}
     */
  constructor(modelName, config = container.config, mysql = container.mysql, util = container.util) {
    this.config = config;
    this.mysql = mysql;
    this.util = util;
    this.modelName = modelName;
    this.connect();
  }

  /**
     * Return mysql pool object, if no pool
     * found then create new one.
     *
     * @return  {any}
     */
  connect() {
    if ( ! this.pool) {
      this.pool = this.mysql.createPool({
        connectionLimit: 10,
        host: this.config.db_host,
        user: this.config.db_user,
        password: this.config.db_password,
        database: this.config.db_database,
      });

      this.pool.query = this.util.promisify(this.pool.query);
    }

    return this.pool;
  }

  /**
     * Close the current open connection
     *
     * @return  {void}
     */
  disconnect() {
    this.pool.end();
    delete this.pool;
  }

  /**
     * Return all records.
     *
     * @param   {string}   columns
     *
     * @return  {object}
     */
  async all(columns = '*') {
    const result = await this.pool.query('SELECT ?? FROM ??', [columns, this.modelName]);

    return result;
  }

  /**
     * Find record matching the given id.
     *
     * @param   {number}  id
     * @param   {string}  columns
     *
     * @return  {array}
     */
  async find(id, columns = '*') {
    const result = await this.pool.query('SELECT ?? FROM ?? WHERE id = ?', [columns, this.modelName, id]);

    return result[0];
  }
}

module.exports = MysqlAdapter;
