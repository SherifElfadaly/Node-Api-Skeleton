const permissionController = container.permissionController;

module.exports = (router) => {
  /**
   * List all permissions.
   */
  router.get('/', permissionController.all);

  /**
   * Finde permission by id.
   */
  router.get('/:id', permissionController.find);

  /**
   * Paginate permissions.
   */
  router.get('/paginate/:page/:perPage', permissionController.paginate);

  /**
   * Find all permissions by the given conditions.
   */
  router.post('/filter', permissionController.findBy);

  /**
   * Paginate permissions by the given conditions.
   */
  router.post('/filter/:page/:perPage', permissionController.paginateBy);

  return router;
};
