const express = require('express');
const app = express();

require('./app/config/services');
require('./app/middlewares')(app);
require('./app/routes')(app, express);

app.listen(container.config.port);
