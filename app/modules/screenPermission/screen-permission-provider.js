module.exports = (container) => {
  container.constant('screenPermissionModel', require('./screen-permission-db-model'));
  container.service('screenPermission', require('./screen-permission'), 'screenPermissionModel');
  container.service('screenPermissionRepository', require('./screen-permission-repository'), 'screenPermission');
  container.service('screenPermissionController', require('./screen-permission-controller'), 'screenPermissionRepository');
  container.constant('screenPermissionRoutes', require('./screen-permission-routes'));
  container.constant('screenPermissionValidationRules', require('./screen-permission-validation-rules'));
};
