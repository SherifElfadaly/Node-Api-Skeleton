module.exports = (container) => {
  container.constant('groupModel', require('./group-model'));
  container.service('groupRepository', require('./group-repository'), 'groupModel');
  container.service('groupController', require('./group-controller'), 'groupRepository');
  container.constant('groupRoutes', require('./group-routes'));
  container.constant('groupValidationRules', require('./group-validation-rules'));
};
