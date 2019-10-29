const ouathClientController = container.ouathClientController;

module.exports = (router) => {
  /**
   * List all ouathClients.
   */
  router.get('/', ouathClientController.list);

  /**
   * Finde ouathClient by id.
   */
  router.get('/:id', ouathClientController.find);

  /**
   * Create new ouathClient.
   */
  router.post('/', container.ouathClientValidationRules.apply('insert'), ouathClientController.insert);

  /**
   * Update the given ouathClient.
   */
  router.patch('/', container.ouathClientValidationRules.apply('update'), ouathClientController.update);

  /**
   * Delete the given ouathClient.
   */
  router.delete('/:id', ouathClientController.delete);

  return router;
};
