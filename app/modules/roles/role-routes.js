const roleController = container.roleController;

module.exports = (router) => {
  /**
   * List all roles.
   */
  router.get('/', roleController.all);

  /**
   * Finde role by id.
   */
  router.get('/:id', roleController.find);

  /**
   * Paginate roles.
   */
  router.get('/paginate/:page/:perPage', roleController.paginate);

  /**
   * Find all roles by the given conditions.
   */
  router.post('/filter', roleController.findBy);

  /**
   * Paginate roles by the given conditions.
   */
  router.post('/filter/:page/:perPage', roleController.paginateBy);

  /**
   * Create new role.
   */
  router.post('/', container.roleValidationRules.apply('insert'), roleController.insert);

  /**
   * Update the given role.
   */
  router.patch('/', container.roleValidationRules.apply('update'), roleController.update);

  /**
   * Delete the given role.
   */
  router.delete('/:id', roleController.delete);

  return router;
};
