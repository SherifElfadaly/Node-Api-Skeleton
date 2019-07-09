const winston = require('winston');
const logger = winston.createLogger({
  /**
   * Write all logs to exception-log
   * Write logs with level error to exception-error-logs.
   *
   * @return  {array}
   */
  transports: [
    new winston.transports.File({filename: 'logs/exception.log', level: 'error'}),
  ],

  /**
   * Combine the current datetime to the log entry.
   */
  format: winston.format.combine(
      winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      winston.format.splat(),
      winston.format.simple(),
  ),
});

/**
 * Show console logs while not @ production level.
 */
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize({all: true}),
        winston.format.simple()
    ),
  }));
}

module.exports = logger;
