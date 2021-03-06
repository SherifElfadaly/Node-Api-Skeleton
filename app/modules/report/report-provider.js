module.exports = (container) => {
  container.constant('reportModel', require('./report-db-model'));
  container.service('report', require('./report'), 'reportModel');
  container.service('reportRepository', require('./report-repository'), 'report');
  container.service('reportController', require('./report-controller'), 'reportRepository');
  container.constant('reportRoutes', require('./report-routes'));
  container.constant('reportValidationRules', require('./report-validation-rules'));

  /** reports */
  container.constant('roleCountModel', require('./reports-models/roles-count-db-model'));
  container.service('roleCount', require('./reports-models/roles-count'), 'roleCountModel');
};
