const rules = {
  'insert': container.joi.object({
    email: container.joi.string().required().email(),
    password: container.joi.string().required(),
  }),
};

module.exports = (method) => {
  return container.validator.body(rules[method]);
};
