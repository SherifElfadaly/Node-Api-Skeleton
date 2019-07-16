module.exports = (app, express) => {
  app.use('/api/users', container.userRoutes(new express.Router()));
};
