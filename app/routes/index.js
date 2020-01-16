const logsRouter = require('./logs-router');

module.exports = (app, express) => {
  app.use('/api/users', container.userRoutes(new express.Router()));
  app.use('/api/roles', container.roleRoutes(new express.Router()));
  app.use('/api/permissions', container.permissionRoutes(new express.Router()));
  app.use('/api/reports', container.reportRoutes(new express.Router()));
  app.use('/api/screens', container.screenRoutes(new express.Router()));
  app.use('/api/screen/permissions', container.screenPermissionRoutes(new express.Router()));
  app.use('/api/platforms', container.platformRoutes(new express.Router()));

  /**
   * Register logs route
   */
  if (process.env.NODE_ENV !== 'production') {
    app.use('/logs', logsRouter(new express.Router()));
  }
};
