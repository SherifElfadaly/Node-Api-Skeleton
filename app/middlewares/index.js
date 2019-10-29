module.exports = (app) => {
  require('./body-parser')(app);
  require('./cors')(app);
  require('./response')(app);
  require('./oauth2-server')(app);
};
