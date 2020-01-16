module.exports = {
  'rules': {
    /**
     * Validation rules for insert method.
     */
    'insert': container.validator.register({
      name: container.validator.
          string().
          required(),
      key: container.validator.
          string().
          required(),
      screens: container.validator.
          array().
          required(),
    }),

    /**
     * Validation rules for update method.
     */
    'update': container.validator.register({
      id: container.validator.
          custom('exists', 'id', 'platform').
          number().
          integer().
          required(),
      name: container.validator.
          string().
          required(),
      key: container.validator.
          custom('unique', 'key', 'platform').
          string().
          required(),
      screens: container.validator.
          array().
          required(),
    }),
  },
  'apply': (method) => {
    return module.exports.rules[method].validate();
  },
};
