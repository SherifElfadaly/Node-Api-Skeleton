module.exports = {
  'rules': {
    /**
     * Validation rules for insert method.
     */
    'insert': container.joi.object({
      name: container.joi.string().max(100).required(),
      key: container.joi.string().max(100).required(),
    }),

    /**
     * Validation rules for update method.
     */
    'update': container.joi.object({
      id: container.joi.number().required(),
      name: container.joi.string().max(100).required(),
    }),
  },
  'apply': (method) => {
    return container.validator.body(module.exports.rules[method]);
  },
};
