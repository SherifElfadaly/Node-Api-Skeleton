module.exports = (container) => {
  container.constant('userModel', require('./user-model'));
  container.service('userRepository', require('./user-repository'), 'userModel');
  container.service('userController', require('./user-controller'), 'userRepository');
};
