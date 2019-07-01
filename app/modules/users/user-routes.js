const userController = container.userController;
const userMappers = container.userMappers;
const mapper = container.mapper;

module.exports = (router) => {
  /**
   * List all users.
   *
   * @apiName      list
   * @mapperSchema responseSchema
   */
  router.get('/', mapper['fetch'](userMappers.responseSchema, true), userController.all);

  /**
   * Finde user by id.
   *
   * @apiName      find
   * @mapperSchema responseSchema
   */
  router.get('/:id', mapper['fetch'](userMappers.responseSchema), userController.find);

  /**
   * Paginate users.
   *
   * @apiName      paginate
   * @mapperSchema responseSchema
   */
  router.get('/:page/:perPage', mapper['fetch'](userMappers.responseSchema, true, true), userController.paginate);

  /**
   * Find all users by the given conditions.
   *
   * @apiName      filter
   * @mapperSchema responseSchema
   */
  router.post('/filter', mapper['fetch'](userMappers.responseSchema, true), userController.findBy);

  /**
   * Paginate users by the given conditions.
   *
   * @apiName      fliterPaginate
   * @mapperSchema responseSchema
   */
  router.post('/filter/:page/:perPage', mapper['fetch'](userMappers.responseSchema, true, true), userController.paginateBy);

  /**
   * Create new user.
   *
   * @apiName         insert
   * @mapperSchema    responseSchema
   * @validationRules insert
   */
  router.post('/', container.userValidationRules.apply('insert'), mapper['request'](userMappers.requestSchema),
      mapper['fetch'](userMappers.responseSchema), userController.insert);

  /**
   * Update the given user.
   *
   * @apiName         update
   * @mapperSchema    responseSchema
   * @validationRules insert
   */
  router.put('/', container.userValidationRules.apply('update'), mapper['request'](userMappers.requestSchema),
      mapper['fetch'](userMappers.responseSchema), userController.update);

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
