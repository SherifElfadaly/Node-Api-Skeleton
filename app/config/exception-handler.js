const logger = require('../helpers/logger');
const moment = require('moment');
const {
  ValidationError,
  NotFoundError,
  DBError,
  ConstraintViolationError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError,
} = require('objection');

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
     * Catch validation errors.
     */
    if (statusCode == 422) {
      exceptionBody = exceptionBody.concat(err.errors);
    /**
     * Catch database errors.
     */
    } else if (err instanceof UniqueViolationError) {
      statusCode = 500;
      exceptionBody.push(`Unique constraint ${err.constraint}`);
    } else if (err instanceof NotNullViolationError) {
      statusCode = 500;
      exceptionBody.push(`Not null constraint `);
    } else if (err instanceof DataError) {
      statusCode = 500;
      exceptionBody.push(`Data error `);
    } else if (err instanceof ConstraintViolationError) {
      statusCode = 500;
      exceptionBody.push(`Constraint violation `);
    } else if (err instanceof ForeignKeyViolationError) {
      statusCode = 500;
      exceptionBody.push(`Foreign key violation `);
    } else if (err instanceof DBError) {
      statusCode = 500;
      exceptionBody.push(`Some unknown DB error`);
    } else if (err instanceof ValidationError) {
      statusCode = 500;
      exceptionBody.push(`Validation Error`);
    } else if (err instanceof NotFoundError) {
      statusCode = 500;
      exceptionBody.push(`Not Found Error`);
    } else if (err instanceof CheckViolationError) {
      statusCode = 500;
      exceptionBody.push(`Check Violation Error`);
    } else {
      exceptionBody.push(err.response || err.message || 'Unidentified Error');
    }

    /**
     * Log error using custom logger.
     */
    if ( ! statusCode || statusCode === 500) {
      logger.log('error', `[${moment().format('YYYY-MM-DD hh:mm:ss')}] ${err.stack}`);
      exceptionBody = container.config.node_env == 'production' ? ['server error'] : exceptionBody;
    }

    /**
     * Send response to the client.
     */
    res.status(statusCode).json({errors: exceptionBody});
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
    logger.log('error', `[${moment().format('YYYY-MM-DD hh:mm:ss')}] ${err.stack}`);
  });
};
