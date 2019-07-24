module.exports = (app, express) => {
  app.use('/api/users', container.userRoutes(new express.Router()));
  app.use('/api/groups', container.groupRoutes(new express.Router()));
  app.use('/api/permissions', container.permissionRoutes(new express.Router()));
};
