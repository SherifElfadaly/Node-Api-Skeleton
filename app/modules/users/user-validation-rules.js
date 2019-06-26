const rules = {
  'insert': container.joi.object({
    email: container.joi.string().required().email(),
    pass: container.joi.string().required(),
  }),
};

module.exports = (method) => {
  return container.validator.body(rules[method]);
};
