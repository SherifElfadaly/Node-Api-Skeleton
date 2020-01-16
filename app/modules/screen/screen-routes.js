const screenController = container.screenController;

module.exports = (router) => {
  /**
   * List all screens.
   */
  router.get('/', screenController.list);

  /**
   * Finde screen by id.
   */
  router.get('/:id', screenController.find);

  /**
   * Create new screen.
   */
  router.post('/', container.screenValidationRules.apply('insert'), screenController.insert);

  /**
   * Update the given screen.
   */
  router.put('/', container.screenValidationRules.apply('update'), screenController.update);

  /**
   * Delete the given screen.
   */
  router.delete('/:id', screenController.delete);

  return router;
};
