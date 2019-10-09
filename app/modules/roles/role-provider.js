module.exports = (container) => {
  container.constant('roleModel', require('./role-model'));
  container.service('role', require('./role'), 'roleModel');
  container.service('roleRepository', require('./role-repository'), 'role');
  container.service('roleController', require('./role-controller'), 'roleRepository');
  container.constant('roleRoutes', require('./role-routes'));
  container.constant('roleValidationRules', require('./role-validation-rules'));
};
