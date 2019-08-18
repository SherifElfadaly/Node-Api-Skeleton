module.exports = {
  'rules': {
    /**
     * Validation rules for insert method.
     */
    'insert': container.joi.object({
      //
    }),

    /**
     * Validation rules for update method.
     */
    'update': container.joi.object({
      //
    }),
  },
  'apply': (method) => {
    return container.validator.body(module.exports.rules[method]);
  },
};
