const userController = container.userController;

module.exports = (router) => {
  /**
   * List all users.
   */
  router.get('/', userController.all);

  /**
   * Finde user by id.
   */
  router.get('/:id', userController.find);

  /**
   * Paginate users.
   */
  router.get('/paginate/:page/:perPage', userController.paginate);

  /**
   * Find all users by the given conditions.
   */
  router.post('/filter', userController.findBy);

  /**
   * Paginate users by the given conditions.
   */
  router.post('/filter/:page/:perPage', userController.paginateBy);

  /**
   * Create new user.
   */
  router.post('/', container.userValidationRules.apply('insert'), userController.insert);

  /**
   * Update the given user.
   */
  router.patch('/', container.userValidationRules.apply('update'), userController.update);

  /**
   * Delete the given user.
   */
  router.delete('/:id', userController.delete);

  /**
   * Login using the given credentials.
   */
  router.post('/login', container.userValidationRules.apply('login'), userController.login);

  return router;
};
