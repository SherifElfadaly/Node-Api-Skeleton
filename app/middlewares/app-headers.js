module.exports = (app) => {
  app.use((req, res, next) => {
    if (req.headers['app-version'] !== container.config.app_version) {
      container.errorHandlers.wrongVersion();
    }
    res.header('app-name', container.config.app_name);
    next();
  });
};
