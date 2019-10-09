module.exports = (container) => {
  container.constant('userModel', require('./user-model'));
  container.service('user', require('./user'), 'userModel');
  container.service('userRepository', require('./user-repository'), 'user');
  container.service('userController', require('./user-controller'), 'userRepository');
  container.constant('userRoutes', require('./user-routes'));
  container.constant('userValidationRules', require('./user-validation-rules'));
};
