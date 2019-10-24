const reportController = container.reportController;

module.exports = (router) => {
  /**
   * List all reports.
   */
  router.get('/', reportController.list);

  /**
   * Finde report by id.
   */
  router.get('/:id', reportController.find);

  /**
   * Create new report.
   */
  router.post('/', container.reportValidationRules.apply('insert'), reportController.insert);

  /**
   * Update the given report.
   */
  router.put('/', container.reportValidationRules.apply('update'), reportController.update);

  /**
   * Delete the given report.
   */
  router.delete('/:id', reportController.delete);

  /**
   * Find report by the given name.
   */
  router.post('/get/:reportName/:page?/:perPage?', reportController.getReport);

  return router;
};
