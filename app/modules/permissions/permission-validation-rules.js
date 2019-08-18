module.exports = {
  'rules': {
    //
  },
  'apply': (method) => {
    return container.validator.body(module.exports.rules[method]);
  },
};
