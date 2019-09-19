const replacetokenController = container.replacetokenController;

module.exports = (router) => {
  /**
   * List all replacetokens.
   */
  router.get('/', replacetokenController.all);

  /**
   * Finde replacetoken by id.
   */
  router.get('/:id', replacetokenController.find);

  /**
   * Paginate replacetokens.
   */
  router.get('/paginate/:page/:perPage', replacetokenController.paginate);

  /**
   * Find all replacetokens by the given conditions.
   */
  router.post('/filter', replacetokenController.findBy);

  /**
   * Paginate replacetokens by the given conditions.
   */
  router.post('/filter/:page/:perPage', replacetokenController.paginateBy);

  /**
   * Create new replacetoken.
   */
  router.post('/', container.replacetokenValidationRules.apply('insert'), replacetokenController.insert);

  /**
   * Update the given replacetoken.
   */
  router.patch('/', container.replacetokenValidationRules.apply('update'), replacetokenController.update);

  /**
   * Delete the given replacetoken.
   */
  router.delete('/:id', replacetokenController.delete);

  return router;
};
