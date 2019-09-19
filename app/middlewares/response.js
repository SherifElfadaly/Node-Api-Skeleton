const mung = require('express-mung');

module.exports = (app) => {
  app.use(mung.json((body, req, res) => {
    /**
     * If the response is pagination then map
     * the result array in the response object.
     */
    if (body && (body.hasOwnProperty('total') || body.meta)) {
      const meta = {...body.meta};
      if (body.total) meta.total = body.total;
      return {
        data: body.results || body,
        meta: {...meta},
      };
    } else {
      return {data: body};
    }
  }));
};

