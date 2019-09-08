/**
* Validator class.
*/
class Validator {
  /**
    * Init new object.
    *
    * @param   {object}  rules
    * @param   {object}  schema
    *
    * @return  {void}
    */
  constructor(rules, schema) {
    this.rules = rules || {};
    this.schema = schema || {};
    // eslint-disable-next-line no-undef
    return new Proxy(this, {
      get: (validator, name) => {
        return validator[name] || container.joi[name];
      },
    });
  }

  /**
    * Register rules to new validator instance.
    *
    * @param   {object}  schema
    *
    * @return  {object}
    */
  register(schema) {
    const validator = new this.constructor(this.rules, schema);
    container.joi.object(schema);
    this.rules = {};

    return validator;
  }

  /**
    * Check if the value unique in the given table & column.
    *
    * @param   {mixed}     callback
    * @param   {string}    attribute
    * @param   {array}     args
    *
    * @return  {object}
    */
  custom(callback, attribute, ...args) {
    this.rules[attribute] = this.rules[attribute] || {};
    this.rules[attribute]['args'] = args;
    this.rules[attribute]['callback'] = require(`./${callback}`) || callback;

    return this;
  }

  /**
    * Validate both joi and async rules.
    *
    * @return  {void}
    */
  validate() {
    return async (req, res, next) => {
      let errors = [];
      errors = errors.concat(this.validateJoi(this.schema, req['body']));
      errors = errors.concat(await this.validateAsync(req['body']));
      this.sendResponse(next, errors);
    };
  }

  /**
    * Validate async rules.
    *
    * @param   {object}  data
    *
    * @return  {array}
    */
  async validateAsync(data) {
    const errors = [];
    for (const key in this.rules) {
      if (this.rules.hasOwnProperty(key)) {
        let value;
        const keys = key.split('.');
        keys.forEach((key) => {
          if ( ! value) value = data[key];
          else value = value[key];
        });
        try {
          const args = [...this.rules[key]['args']];
          const callback = this.rules[key]['callback'];
          args.unshift(key);
          args.unshift(data['id']);
          args.unshift(value);
          if (value) await callback(...args);
        } catch (error) {
          errors.push(error.message);
        }
      }
    }

    return errors;
  }

  /**
    * Validate joi rules.
    *
    * @param   {object}  schema
    * @param   {object}  data
    *
    * @return  {array}
    */
  validateJoi(schema, data) {
    const result = container.joi.validate(data, schema, {abortEarly: false});
    if (result.error) {
      return result.error.details.map((obj) => {
        return obj.message;
      });
    }

    return [];
  }

  /**
    * Call next with or without errors based
    * on the errors array.
    *
    * @param   {object}  next
    * @param   {array}  errors
    *
    * @return  {void}
    */
  sendResponse(next, errors) {
    if ( ! errors.length) {
      next();
    } else {
      const err = {};
      err.statusCode = '422';
      err.errors = errors;

      next(err);
    }
  }
}

module.exports = Validator;