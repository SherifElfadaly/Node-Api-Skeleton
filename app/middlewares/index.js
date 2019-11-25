module.exports = (app) => {
  require('./body-parser')(app);
  require('./cors')(app);
  require('./response')(app);
  require('./app-headers')(app);
};
