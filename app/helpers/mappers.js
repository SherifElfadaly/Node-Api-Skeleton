module.exports = {
  /**
     * Mapper for all methods.
     *
     * @param   {object}   schema
     *
     * @return  {array}
     */
  'response': (schema) => {
    return container.mung.json((body, req, res) => {
      /**
         * If the response is pagination then map
         * the result array in the response object.
         */
      if (body.total) {
        return {
          data: body.results.map((obj) => {
            return container.objectMapper(obj, schema);
          }),
          meta: {total: body.total},
        };
      }

      /**
         * Map single object.
         * If Array map each row on the array
         * Otherwise return a array of that single object
         */
      if (Array.isArray(body)) {
        return {
          data: body.map((obj) => {
            return container.objectMapper(obj, schema);
          }),
        };
      } else {
        return {data: container.objectMapper(body, schema)};
      }
    });
  },
  /**
     * Mapper for request methods.
     *
     * @param   {object}   schema
     *
     * @return  {void}
     */
  'request': (schema) => {
    return (req, res, next) => {
      req.body = container.objectMapper(req.body, schema);
      next();
    };
  },
};
