const permissionController = container.permissionController;

module.exports = (router) => {
  /**
   * List all permissions.
   */
  router.get('/', permissionController.list);

  /**
   * Finde permission by id.
   */
  router.get('/:id', permissionController.find);

  return router;
};
