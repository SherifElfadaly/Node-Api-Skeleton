module.exports = (container) => {
  container.constant('roleModel', require('./role-model'));
  container.service('roleRepository', require('./role-repository'), 'roleModel');
  container.service('roleController', require('./role-controller'), 'roleRepository');
  container.constant('roleRoutes', require('./role-routes'));
  container.constant('roleValidationRules', require('./role-validation-rules'));
};
