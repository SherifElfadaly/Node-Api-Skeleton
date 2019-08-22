module.exports = {
  'rules': {
    /**
     * Validation rules for insert method.
     */
    'insert': container.joi.object({
      email: container.validator.
          custom('unique', 'email', 'users').
          string().
          required().
          email(),
      password: container.validator.
          string().
          required(),
    }),

    /**
     * Validation rules for update method.
     */
    'update': container.joi.object({
      id: container.validator.
          custom('exists', 'id', 'users').
          number().
          required(),
      email: container.validator.
          custom('unique', 'email', 'users').
          string().
          required().
          email(),
      password: container.validator.
          string().
          required(),
    }),

    /**
     * Validation rules for logn method.
     */
    'login': container.joi.object({
      email: container.validator.
          string().
          required().
          email(),
      password: container.validator.
          string().
          required(),
    }),
  },
  'apply': (method) => {
    return module.exports.rules[method].validate();
  },
};
