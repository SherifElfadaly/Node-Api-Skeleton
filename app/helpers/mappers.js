module.exports = {
  /**
     * Mapper for all methods.
     *
     * @param   {object}   schema
     * @param   {boolean}  returnArray
     * @param   {boolean}  isPagination
     *
     * @return  {array}
     */
  'response': (schema, returnArray = false, isPagination = false) => {
    return container.mung.json((body, req, res) => {
      /**
         * Map array of objects.
         */
      if (returnArray) {
        /**
           * If the response is pagination then map
           * the result array in the response object.
           */
        if (isPagination) {
          body.results = body.results.map((obj) => {
            return container.objectMapper(obj, schema);
          });

          return body;
        }

        /**
           * Map single object.
           * If Array map each row on the array 
           * Otherwise return a array of that single object 
           */

        if (Array.isArray(body)) {
          return body.map((obj) => {
            return container.objectMapper(obj, schema);
          });
        }
        else return [container.objectMapper(body, schema)];
      }

      return container.objectMapper(body, schema);
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
