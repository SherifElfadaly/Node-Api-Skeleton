module.exports = {
  'insert': container.joi.object({
    email: container.joi.string().required().email(),
    password: container.joi.string().required(),
  }),
};
