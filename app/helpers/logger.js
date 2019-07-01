const winston = require('winston');
require('winston-mail').Mail;

const logger = winston.createLogger({
  /**
   * Write all logs to exception-log
   * Write logs with level error to exception-error-logs.
   *
   * @return  {array}
   */
  transports: [
    new winston.transports.File({filename: 'logs/exception-logs.log'}),
    new winston.transports.File({filename: 'logs/exception-error-logs.log', level: 'error'}),

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
if (container.config.node_env !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize({all: true}),
        winston.format.simple()
    ),
  }));
}

/**
 * Modify for sending logs emails @ production level.
 */
if (container.config.node_env == 'production') {
  logger.add(new winston.transports.Mail({
    to: 'toAddress',
    from: 'fromAddress',
    subject: 'uncaughtException Report',
    host: 'smtp.relaxitsjustanexample.com',
    username: 'emailadd',
    password: 'password',
    ssl: true,
  }));
}

module.exports = logger;
