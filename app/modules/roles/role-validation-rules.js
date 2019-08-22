module.exports = {
  'rules': {
    /**
     * Validation rules for insert method.
     */
    'insert': container.joi.object({
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
    'update': container.joi.object({
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
