module.exports = (app, express) => {
  const router = new express.Router();
  app.use('/api/users', container.userRoutes(router));
};
