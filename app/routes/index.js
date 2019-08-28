module.exports = (app, express) => {
  app.use('/api/users', container.userRoutes(new express.Router()));
  app.use('/api/roles', container.roleRoutes(new express.Router()));
  app.use('/api/permissions', container.permissionRoutes(new express.Router()));
};
