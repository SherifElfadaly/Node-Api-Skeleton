module.exports = (app, express) => {
  const router = new express.Router();
  app.use('/api/users', require('./user-routes')(router));
};
