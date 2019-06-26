
const mappers = {
  'all': () => {
    return container.mung.json((body, req, res) => {
      const schema = {
        'email': 'email',
        'password': 'pass',
      };

      return container.mapper(body, schema);
    });
  },
  'insert': () => {
    return (req, res, next) => {
      const schema = {
        'email': 'email',
        'pass': 'password',
      };

      req.body = container.mapper(req.body, schema);
      next();
    };
  },
};

module.exports = (method) => {
  return mappers[method]();
};
