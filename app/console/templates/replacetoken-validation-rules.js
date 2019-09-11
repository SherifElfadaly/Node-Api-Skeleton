module.exports = {
  'rules': {
    /**
     * Validation rules for insert method.
     */
    'insert': container.validator.register({
      //
    }),

    /**
     * Validation rules for update method.
     */
    'update': container.validator.register({
      //
    }),
  },
  'apply': (method) => {
    return module.exports.rules[method].validate();
  },
};
