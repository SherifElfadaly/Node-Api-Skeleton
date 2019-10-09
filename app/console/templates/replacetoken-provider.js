module.exports = (container) => {
  container.constant('replacetokenModel', require('./filenametoken-model'));
  container.service('replacetoken', require('./filenametoken'), 'replacetokenModel');
  container.service('replacetokenRepository', require('./filenametoken-repository'), 'replacetoken');
  container.service('replacetokenController', require('./filenametoken-controller'), 'replacetokenRepository');
  container.constant('replacetokenRoutes', require('./filenametoken-routes'));
  container.constant('replacetokenValidationRules', require('./filenametoken-validation-rules'));
};
