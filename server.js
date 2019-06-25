const express = require('express');
const app = express();

require('./app/config/services');
require('./app/middlewares')(app);
require('./app/routes')(app, express);
require('./app/config/exceptionHandler').errHandler(app);

app.listen(container.config.port);
