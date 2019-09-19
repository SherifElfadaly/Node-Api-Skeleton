module.exports = (container) => {
  container.constant('reportModel', require('./report-model'));
  container.service('reportRepository', require('./report-repository'), 'reportModel');
  container.service('reportController', require('./report-controller'), 'reportRepository');
  container.constant('reportRoutes', require('./report-routes'));
  container.constant('reportValidationRules', require('./report-validation-rules'));
};
