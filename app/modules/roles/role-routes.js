const roleController = container.roleController;

module.exports = (router) => {
  /**
   * List roles.
   */
  router.get('/', roleController.list);

  /**
   * Finde role by id.
   */
  router.get('/:id', roleController.find);

  /**
   * Create new role.
   */
  router.post('/', container.roleValidationRules.apply('insert'), roleController.insert);

  /**
   * Update the given role.
   */
  router.put('/', container.roleValidationRules.apply('update'), roleController.update);

  /**
   * Delete the given role.
   */
  router.delete('/:id', roleController.delete);

  return router;
};
