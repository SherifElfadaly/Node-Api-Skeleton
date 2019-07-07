const logger = require('../helpers/logger');

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
      if (wrappedRoute && wrappedRoute.catch) {
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
module.exports.expressExceptionHandler = (app) => {
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
    logger.log('error', statusCode + ' ' + exceptionBody);

    /**
     * Send response to the client.
     */
    res.status(statusCode || 500).json({errors: container.config.node_env == 'production' ? 'server error' : exceptionBody});
  });
};


module.exports.exceptionHandler = () => {
/**
   * Catch unhandeled promis and throw exception.
   */
  process.on('unhandledRejection', (reason, p) => {
    throw reason;
  });

  /**
     * Catch exception and log it using winston.
     */
  process.on('uncaughtException', (err) => {
    /**
       * Log error using custom logger.
       */
    logger.log('error', '500 ' + err.message);
  });
};
