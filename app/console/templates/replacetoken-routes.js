const replacetokenController = container.replacetokenController;

module.exports = (router) => {
  /**
   * List all replacetokens.
   */
  router.get('/', replacetokenController.list);

  /**
   * Finde replacetoken by id.
   */
  router.get('/:id', replacetokenController.find);

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
