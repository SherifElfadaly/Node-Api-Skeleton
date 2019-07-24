module.exports = (container) => {
  container.constant('permissionModel', require('./permission-model'));
  container.service('permissionRepository', require('./permission-repository'), 'permissionModel');
  container.service('permissionController', require('./permission-controller'), 'permissionRepository');
  container.constant('permissionRoutes', require('./permission-routes'));
  container.constant('permissionValidationRules', require('./permission-validation-rules'));
};
