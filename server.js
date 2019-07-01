const express = require('express');
const app = express();

require('./app/config/services');
require('./app/middlewares')(app);

/**
 * Apidoc routes.
 */
app.use(express.static('public'));
app.engine('handlebars', container.handlebars());
app.set('view engine', 'handlebars');
app.get('/apidoc', async (req, res) => {
  const data = await require('./app/routes/apidoc')(new express.Router());
  res.render('apidoc', {
    data: data,
    layout: false,
    helpers: {
      eq: (val1, val2, options) => {
        return options.fn(val1 === val2);
      },
      includes: (val1, val2, options) => {
        return options.fn(val1.includes(val2));
      },
      join: (val) => {
        return val.join(',');
      },
      stringify: (val) => {
        return JSON.stringify(val, null, 4);
      },
    },
  });
});

require('./app/routes')(app, express);
require('./app/config/exception-handler').errorHandler(app);

app.use(function(req, res) {
  res.status(404).send({error: 'Not Found'});
});

app.listen(container.config.port);

