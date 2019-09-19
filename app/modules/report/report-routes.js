const reportController = container.reportController;

module.exports = (router) => {
  /**
   * List all reports.
   */
  router.get('/', reportController.all);

  /**
   * Finde report by id.
   */
  router.get('/:id', reportController.find);

  /**
   * Paginate reports.
   */
  router.get('/:page/:perPage', reportController.paginate);

  /**
   * Find all reports by the given conditions.
   */
  router.post('/filter', reportController.findBy);

  /**
   * Paginate reports by the given conditions.
   */
  router.post('/filter/:page/:perPage', reportController.paginateBy);

  /**
   * Create new report.
   */
  router.post('/', container.reportValidationRules.apply('insert'), reportController.insert);

  /**
   * Update the given report.
   */
  router.patch('/', container.reportValidationRules.apply('update'), reportController.update);

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
