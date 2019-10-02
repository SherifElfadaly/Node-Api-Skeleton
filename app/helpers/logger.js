const winston = require('winston');
require('winston-daily-rotate-file');

/**
 * Set trasport DailyRotateFile
 */
const transport = new (winston.transports.DailyRotateFile)({
  filename: 'logs/%DATE%.log',
  datePattern: 'YYYY-MM-D',
  zippedArchive: false,
  // zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

/**
 * On Day change
 */
transport.on('rotate', function(oldFilename, newFilename) {
  new winston.transports.File({filename: `${newFilename}`, level: 'error'});
});

/**
 * Create logger
 */
const logger = winston.createLogger({
  /**
   * Write all logs to exception-log
   * Write logs with level error to exception-error-logs.
   *
   * @return  {array}
   */
  transports: [
    transport,
  ],

  /**
   * Combine the current datetime to the log entry.
   */
  format: winston.format.combine(
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
