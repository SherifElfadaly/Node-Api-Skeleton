const userController = container.userController;

module.exports = (router) => {
  /**
   * List all users.
   *
   * @apiName      list
   * @mapperSchema responseSchema
   */
  router.get('/', userController.all);

  /**
   * Finde user by id.
   *
   * @apiName      find
   * @mapperSchema responseSchema
   */
  router.get('/:id', userController.find);

  /**
   * Paginate users.
   *
   * @apiName      paginate
   * @mapperSchema responseSchema
   */
  router.get('/:page/:perPage', userController.paginate);

  /**
   * Find all users by the given conditions.
   *
   * @apiName      filter
   * @mapperSchema responseSchema
   */
  router.post('/filter', userController.findBy);

  /**
   * Paginate users by the given conditions.
   *
   * @apiName      fliterPaginate
   * @mapperSchema responseSchema
   */
  router.post('/filter/:page/:perPage', userController.paginateBy);

  /**
   * Create new user.
   *
   * @apiName         insert
   * @mapperSchema    responseSchema
   * @validationRules insert
   */
  router.post('/', container.userValidationRules.apply('insert'), userController.insert);

  /**
   * Update the given user.
   *
   * @apiName         update
   * @mapperSchema    responseSchema
   * @validationRules insert
   */
  router.patch('/', container.userValidationRules.apply('update'), userController.update);

  /**
   * Delete the given user.
   *
   * @apiName         delete
   * @mapperSchema    responseSchema
   * @validationRules insert
   */
  router.delete('/:id', userController.delete);

  return router;
};
