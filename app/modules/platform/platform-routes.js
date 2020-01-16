const platformController = container.platformController;

module.exports = (router) => {
  /**
   * List all platforms.
   */
  router.get('/', platformController.list);

  /**
   * Finde platform by id.
   */
  router.get('/:id', platformController.find);

  /**
   * Create new platform.
   */
  router.post('/', container.platformValidationRules.apply('insert'), platformController.insert);

  /**
   * Update the given platform.
   */
  router.put('/', container.platformValidationRules.apply('update'), platformController.update);

  /**
   * Delete the given platform.
   */
  router.delete('/:id', platformController.delete);

  return router;
};
