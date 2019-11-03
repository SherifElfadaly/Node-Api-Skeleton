const oauthClientController = container.oauthClientController;

module.exports = (router) => {
  /**
   * List all oauthClients.
   */
  router.get('/', oauthClientController.list);

  /**
   * Finde oauthClient by id.
   */
  router.get('/:id', oauthClientController.find);

  /**
   * Create new oauthClient.
   */
  router.post('/', container.oauthClientValidationRules.apply('insert'), oauthClientController.insert);

  /**
   * Update the given oauthClient.
   */
  router.patch('/', container.oauthClientValidationRules.apply('update'), oauthClientController.update);

  /**
   * Delete the given oauthClient.
   */
  router.delete('/:id', oauthClientController.delete);

  return router;
};
