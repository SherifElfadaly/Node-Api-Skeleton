const objection = container.objection;

/**
 * Model class
 */
class Model extends objection {
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
      this.created_at = container.moment().format('YYYY-MM-DD HH:mm:ss');
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
      this.updated_at = container.moment().format('YYYY-MM-DD HH:mm:ss');
    });
  }

  /**
    * Format json result.
    *
    * @param   {object}  json
    * @param   {object}  options
    *
    * @return  {void}
    */
  $formatJson(json, options) {
    json = super.$formatJson(json, options);
    for (const key in json) {
      if ((key.endsWith('_id') && this.constructor.allowedForeigns.indexOf(key) < 0) ||
          this.constructor.hiddenFields.indexOf(key) >= 0) {
        delete json[key];
      }
    }

    return json;
  }
}

module.exports = Model;
