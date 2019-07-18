const mung = require('express-mung');

module.exports = (app) => {
  app.use(mung.json((body, req, res) => {
    /**
     * If the response is pagination then map
     * the result array in the response object.
     */
    if (body.total) {
      return {
        data: body.results,
        meta: {total: body.total},
      };
    } else {
      return {data: body};
    }
  }));
};

