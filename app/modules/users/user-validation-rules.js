module.exports = {
  'rules': {
    /**
     * Validation rules for insert method.
     */
    'insert': container.validator.register({
      email: container.validator.
          custom('unique', 'email', 'user').
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
          custom('exists', 'id', 'user').
          number().
          required(),
      email: container.validator.
          custom('unique', 'email', 'user').
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

    /**
     * Validation rules for resetUserPassword method.
     */
    'resetUserPassword': container.validator.register({
      id: container.validator.
          custom('exists', 'id', 'user').
          number().
          required(),
      password: container.validator.
          string().
          required(),
    }),

    /**
     * Validation rules for changePassword method.
     */
    'changePassword': container.validator.register({
      password: container.validator.
          string().
          required(),
      old_password: container.validator.
          string().
          required(),
      password_confirmation: container.validator.
          custom('equal', 'password_confirmation', 'password').
          string().
          required(),
    }),

    /**
     * Validation rules for forgotPassword method.
     */
    'forgotPassword': container.validator.register({
      email: container.validator.
          custom('exists', 'email', 'user').
          string().
          required(),
    }),

    /**
     * Validation rules for resetPassword method.
     */
    'resetPassword': container.validator.register({
      token: container.validator.
          custom('tokenValid', 'token').
          string().
          required(),
      password: container.validator.
          string().
          required(),
      password_confirmation: container.validator.
          custom('equal', 'password_confirmation', 'password').
          string().
          required(),
    }),

    /**
     * Validation rules for sendConfirmEmail method.
     */
    'sendConfirmEmail': container.validator.register({
      id: container.validator.
          custom('exists', 'id', 'user').
          number().
          required(),
    }),

    /**
     * Validation rules for updateProfile method.
     */
    'updateProfile': container.validator.register({
      name: container.validator.
          string().
          allow(null, ''),
      imageChecksum: container.validator.
          string().
          allow(null, ''),
    }),
  },
  'apply': (method) => {
    return module.exports.rules[method].validate();
  },
};
