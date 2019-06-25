/**
 * Router exception handler wrapper.
 *
 * @param {CallableFunction} cb Controller body
 * @return {function (req,res,next)}  exception free controller logic as a function
 */
module.exports.asyncWrapper = (cb) => {
  return (req, res, next) => {
    try {
      const wrappedRoute = cb(req, res, next);
      if (wrappedRoute.catch) {
        wrappedRoute.catch((err) => {
          next(err);
        });
      }
    } catch (err) {
      next(err);
    }
  };
};

/**
 * Error handling middleWare.
 *
 * @param {object} app express object
 */
module.exports.errorHandler = (app) => {
  app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let exceptionBody = [err.response || err.message || 'Unidentified Error'];

    /**
     * Catch joi validation errors.
     */
    if (err.error && err.error.isJoi) {
      statusCode = 422;
      exceptionBody = [];

      /**
       * Map errors to display message only.
       */
      err.error.details.map((error) => {
        exceptionBody.push(error.message);
      });
    }

    /**
     * Log error using custom logger.
     */
    container.logger.log('error', statusCode + ' ' + exceptionBody);

    /**
     * Send response to the client.
     */
    res.status(statusCode || 500).json({errors: exceptionBody});
  });
};

