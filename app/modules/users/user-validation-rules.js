module.exports = {
  'rules': {
    /**
     * Validation rules for insert method.
     */
    'insert': container.joi.object({
      email: container.joi.string().required().email(),
      password: container.joi.string().required(),
    }),
    /**
     * Validation rules for update method.
     */
    'update': container.joi.object({
      id: container.joi.number().required(),
      email: container.joi.string().required().email(),
      password: container.joi.string().required(),
    }),
  },
  'apply': (method) => {
    return container.validator.body(module.exports.rules[method]);
  },
};
