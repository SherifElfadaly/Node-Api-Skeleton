const screenPermissionController = container.screenPermissionController;

module.exports = (router) => {
  /**
   * List all screenPermissions.
   */
  router.get('/', screenPermissionController.list);

  /**
   * Finde screenPermission by id.
   */
  router.get('/:id', screenPermissionController.find);

  /**
   * Create new screenPermission.
   */
  router.post('/', container.screenPermissionValidationRules.apply('insert'), screenPermissionController.insert);

  /**
   * Update the given screenPermission.
   */
  router.put('/', container.screenPermissionValidationRules.apply('update'), screenPermissionController.update);

  /**
   * Delete the given screenPermission.
   */
  router.delete('/:id', screenPermissionController.delete);

  return router;
};
