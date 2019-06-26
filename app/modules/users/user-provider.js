module.exports = (container) => {
  container.constant('userModel', require('./user-model'));
  container.constant('userMapper', require('./user-mapper'));
  container.service('userRepository', require('./user-repository'), 'userModel');
  container.service('userController', require('./user-controller'), 'userRepository');
  container.constant('userRoutes', require('./user-routes'));
  container.constant('userValidationRules', require('./user-validation-rules'));
};
