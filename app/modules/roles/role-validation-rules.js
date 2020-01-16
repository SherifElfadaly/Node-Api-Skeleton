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
          custom('exists', 'id', 'role').
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

    /**
     * Validation rules for assignRole method.
     */
    'assignScreenPermission': container.validator.register({
      id: container.validator.custom('exists', 'role.id', 'role', 'id').number().required(),
      screenPermissions: container.validator.array().items(container.validator.object({
        id: container.validator.
            number().
            required(),
        permission: container.validator.object({
          id: container.validator.
              string().
              required(),
        }).unknown(true).required(),
      }).unknown(true).required()).required(),
    }),
  },
  'apply': (method) => {
    return module.exports.rules[method].validate();
  },
};
