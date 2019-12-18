/**
 * Set default time zone;
 */
process.env.TZ = 'UTC';

// Get task name fron crontab exec command
const taskName = process.argv[2];
require('dotenv').config({path: `${__dirname }/.env`});

/**
 * Register node exception handler.
 */
require('./app/config/exception-handler').exceptionHandler();

/**
 * Initialize the container.
 */
require('./app/config/container');

/**
 * Initialize Tasks
 */
require('./app/config/cron-config').exec(true);

/**
 * Exec the task by name
 */
cronTasks[`${taskName}`].run();

/**
 * Set default time zone;
 */
process.env.TZ = container.config.time_zone;
