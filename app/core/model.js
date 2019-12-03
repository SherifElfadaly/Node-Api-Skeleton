/**
 * Model class.
 */
class Model {
  /**
    * Create new model
    *
    * @param   {object}  model
    *
    * @return  {void}
    */
  constructor(model) {
    if (model) {
      /**
       * Format json before returning result.
       *
       * @param   {object}  json
       *
       * @return  {object}
       */
      model.prototype.$formatJson = (json) => {
        if (Array.isArray(json)) {
          const data = [];
          json.forEach((row) => {
            data.push(this.mapJson(row));
          });

          return data;
        } else {
          return this.mapJson(json);
        }
      };

      /**
       * Format json before inserting or updating data.
       *
       * @param   {object}  json
       *
       * @return  {object}
       */
      model.prototype.$parseJson = (json) => {
        const data = new this.constructor();
        for (const key in data.constructor.mappings) {
          if (this.hasOwnProperty(key)) {
            data[this.constructor.mappings[key]] = json[key];

            if ( ! json[key]) delete data[this.constructor.mappings[key]];
          }
        }

        for (const key in data) {
          if (this.hasOwnProperty(key)) {
            const setter = this[`set${key.charAt(0).toUpperCase() + key.slice(1)}`];
            if (setter) setter.bind(data)(json[key]);
          }
        }
        return data;
      };
    }
  }

  /**
   * Map object.
   *
   * @param   {object}  json
   *
   * @return  {object}
   */
  mapJson(json) {
    const data = new this.constructor();
    for (const key in data.constructor.mappings) {
      if (data.hasOwnProperty(key)) {
        data[key] = json[this.constructor.mappings[key]];
      }
    }

    for (let index = 0; index < data.constructor.hiddenFields.length; index++) {
      const attr = data.constructor.hiddenFields[index];
      delete data[attr];
    }

    return data;
  }
}
module.exports = Model;
