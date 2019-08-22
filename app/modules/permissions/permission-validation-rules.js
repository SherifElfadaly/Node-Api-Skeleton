module.exports = {
  'rules': {
    //
  },
  'apply': (method) => {
    return module.exports.rules[method].validate();
  },
};
