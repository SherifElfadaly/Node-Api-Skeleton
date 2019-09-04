module.exports = {
  'rules': {
    /**
     * Validation rules for insert method.
     */
    'insert': container.validator.register({
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
    'update': container.validator.register({
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
     * Validation rules for login method.
     */
    'login': container.validator.register({
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
