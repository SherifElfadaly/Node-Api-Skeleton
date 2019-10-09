module.exports = (container) => {
  container.constant('reportModel', require('./report-model'));
  container.service('report', require('./report'), 'reportModel');
  container.service('reportRepository', require('./report-repository'), 'report');
  container.service('reportController', require('./report-controller'), 'reportRepository');
  container.constant('reportRoutes', require('./report-routes'));
  container.constant('reportValidationRules', require('./report-validation-rules'));
};
