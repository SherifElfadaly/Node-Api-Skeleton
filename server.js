const express = require('express');
const app = express();

require('./app/config/services');
require('./app/middlewares')(app);
require('./app/routes')(app, express);
require('./app/config/exception-handler').errorHandler(app);

app.use(function(req, res) {
  res.status(404).send({error: 'Not Found'});
});

app.listen(container.config.port);
