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
            if (json[key] && typeof json[key] == 'object' && json[key].$parseJson) json[key] = json[key].$parseJson(json[key]);
            data[this.constructor.mappings[key]] = json[key];
            if (json[key] === undefined) delete data[this.constructor.mappings[key]];
          }
        }

        for (let index = 0; index < data.constructor.unFillable.length; index++) {
          const attr = data.constructor.unFillable[index];
          delete data[attr];
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
      if ( ! json.skipHidden || ! json.skipHidden.includes(attr)) delete data[attr];
    }

    for (const key in data) {
      if (this.hasOwnProperty(key)) {
        const getter = this[`get${key.charAt(0).toUpperCase() + key.slice(1)}`];
        if (getter) getter.bind(data)(json[key]);
      }
    }

    return data;
  }
}
module.exports = Model;
