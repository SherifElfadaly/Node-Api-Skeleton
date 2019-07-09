const logger = require('../helpers/logger');

const {
  DataError,
  ConstraintViolationError,
  ForeignKeyViolationError,
  UniqueViolationError,
  NotNullViolationError,
  DBError,
} = require('objection-db-errors');

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
    let exceptionBody = [];

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

    /**
     * Catch database errors.
     */
    } else if (err instanceof UniqueViolationError) {
      exceptionBody.push(`Unique constraint ${err.constraint}`);
    } else if (err instanceof NotNullViolationError) {
      exceptionBody.push(`Not null constraint `);
    } else if (err instanceof DataError) {
      exceptionBody.push(`Data error `);
    } else if (err instanceof ConstraintViolationError) {
      exceptionBody.push(`Constraint violation `);
    } else if (err instanceof ForeignKeyViolationError) {
      exceptionBody.push(`Foreign key violation `);
    } else if (err instanceof DBError) {
      exceptionBody.push(`Some unknown DB error`);
    } else {
      exceptionBody.push(err.response || err.message || 'Unidentified Error');
    }

    /**
     * Log error using custom logger.
     */
    logger.log('error', statusCode + ' ' + err.stack);

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
    logger.log('error', '500 ' + err.stack);
  });
};
