const express = require('express');
const app = express();

require('./app/config/services');
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

require('./app/routes')(app, express);
require('./app/config/exception-handler').errorHandler(app);

app.use(function(req, res) {
  res.status(404).send({error: 'Not Found'});
});

app.listen(container.config.port);
