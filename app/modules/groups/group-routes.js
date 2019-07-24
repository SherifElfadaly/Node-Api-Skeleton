const groupController = container.groupController;

module.exports = (router) => {
  /**
   * List all groups.
   */
  router.get('/', groupController.all);

  /**
   * Finde group by id.
   */
  router.get('/:id', groupController.find);

  /**
   * Paginate groups.
   */
  router.get('/:page/:perPage', groupController.paginate);

  /**
   * Find all groups by the given conditions.
   */
  router.post('/filter', groupController.findBy);

  /**
   * Paginate groups by the given conditions.
   */
  router.post('/filter/:page/:perPage', groupController.paginateBy);

  /**
   * Create new group.
   */
  router.post('/', container.groupValidationRules.apply('insert'), groupController.insert);

  /**
   * Update the given group.
   */
  router.patch('/', container.groupValidationRules.apply('update'), groupController.update);

  /**
   * Delete the given group.
   */
  router.delete('/:id', groupController.delete);

  return router;
};
