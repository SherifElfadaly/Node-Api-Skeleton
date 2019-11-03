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
          if (this.hasOwnProperty(key)) {
            data[this.constructor.mappings[key]] = json[key];
          }
        }
        return data;
      };
    }
  }
}
module.exports = Model;
