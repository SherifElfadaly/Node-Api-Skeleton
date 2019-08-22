module.exports = {
  'rules': {
    /**
     * Validation rules for insert method.
     */
    'insert': container.validator.register({
      name: container.validator.
          string().
          max(100).
          required(),
      key: container.validator.
          string().
          max(100).
          required(),
    }),

    /**
     * Validation rules for update method.
     */
    'update': container.validator.register({
      id: container.validator.
          custom('exists', 'id', 'roles').
          number().
          required(),
      name: container.validator.
          string().
          max(100).
          required(),
      key: container.validator.
          string().
          max(100).
          required(),
    }),
  },
  'apply': (method) => {
    return module.exports.rules[method].validate();
  },
};
