module.exports = (container) => {
  container.constant('userModel', require('./user-model'));
  container.service('userRepository', require('./user-repository'), 'userModel');
  container.service('userController', require('./user-controller'), 'userRepository');
  container.constant('userRoutes', require('./user-routes'));
};
