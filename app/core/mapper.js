/**
 * Mapper class.
 */
class Mapper {
  /**
    * Create new model
    *
    * @param   {object}  model
    *
    * @return  {void}
    */
  constructor(model) {
    /**
     * Format json before returning result.
     *
     * @param   {object}  json
     *
     * @return  {object}
     */
    model.prototype.$formatJson = (json) => {
      const data = {};
      for (const key in this) {
        if (this.hasOwnProperty(key) && this.hiddenFields.indexOf(key) < 0) {
          data[key] = json[this.mappings[key]];
        }
      }

      return data;
    };

    /**
     * Format json before inserting or updating data.
     *
     * @param   {object}  json
     *
     * @return  {object}
     */
    model.prototype.$parseJson = (json) => {
      const data = {};
      for (const key in this) {
        if (this.hasOwnProperty(key) && json[key]) {
          data[this.mappings[key]] = json[key];
        }
      }

      return data;
    };

    // eslint-disable-next-line no-undef
    return new Proxy(this, {
      get: (model, name) => {
        return model[name].bind(model);
      },
    });
  }
}

module.exports = Mapper;
