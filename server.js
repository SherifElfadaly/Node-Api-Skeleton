require('dotenv').config();
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const sticky = require('sticky-session');
const io = require('socket.io')(server);
const redis = require('socket.io-redis');

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
if (process.env.NODE_ENV === 'production') {
  sticky.listen(server, container.config.port);
} else {
  server.listen(container.config.port);
}

/**
 * Register redis as an adapter for socket io.
 */
io.adapter(redis({host: container.config.redis_host, port: container.config.redis_port}));
container.io = io;

/**
 * Make sure the user is authenticated before
 * subscriping to the socket.
 */
io.use(async (socket, next) => {
  await container.auth.check(socket.handshake.query.token);
  next();
});

/**
 * Set default time zone;
 */
process.env.TZ = container.config.time_zone;
