require('dotenv').config();
const express = require('express');
const app = express();

/**
 * Register node exception handler.
 */
require('./app/config/exception-handler').exceptionHandler();

/**
 * Initialize the container.
 */
require('./app/config/container');

/**
 * Register express middlewares.
 */
require('./app/middlewares')(app);

/**
 * Register express routes.
 */
require('./app/routes')(app, express);

/**
 * Register express exception handler.
 */
require('./app/config/exception-handler').expressExceptionHandler(app);

/**
 * Register express not found middleware.
 */
app.use((req, res) => {
  res.status(404).send({errors: ['not found']});
});

/**
 * Start the server.
 */
app.listen(container.config.port);
