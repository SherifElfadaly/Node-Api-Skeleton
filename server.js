const express = require('express');
const app = express();

/**
 * Register node exception handler.
 */
require('./app/config/exception-handler').exceptionHandler();

/**
 * Initialize the container.
 */
require('./app/config/services');

/**
 * Register express middlewares.
 */
require('./app/middlewares')(app);

/**
 * Apidoc routes.
 */
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/apidoc', async (req, res) => {
  const data = await require('./app/routes/apidoc')(new express.Router());
  res.render('apidoc', {data: data, host: req.headers.host});
});

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
app.use(function(req, res) {
  res.status(404).send({error: 'Not Found'});
});

/**
 * Start the server.
 */
app.listen(container.config.port);
