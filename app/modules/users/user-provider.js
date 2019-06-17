module.exports = (container) => {
  container.service('userModel', require('./user-model'));
  container.service('userRepository', require('./user-repository'), 'userModel');
  container.service('userController', require('./user-controller'), 'userRepository');
};
