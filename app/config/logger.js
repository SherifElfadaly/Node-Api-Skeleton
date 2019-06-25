const winston = require('winston');
require('winston-mail').Mail;

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({filename: 'logs/exception-logs.log'}),
    new winston.transports.File({filename: 'logs/exception-error-logs.log', level: 'error'}),

  ],
  format: winston.format.combine(
      winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      winston.format.splat(),
      winston.format.simple(),

  ),
});

// SHOW console logs while not @ production level
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize({all: true}),
        winston.format.simple()
    ),
  }));
}

// MODIFY for sending logs emails @ production level
if (process.env.NODE_ENV == 'production') {
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
