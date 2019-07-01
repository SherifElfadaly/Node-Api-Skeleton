const userController = container.userController;
const userMappers = container.userMappers;
const mapper = container.mapper;

module.exports = (router) => {
  /**
   * List all users.
   *
   * @mapperSchema fetchSchema
   */
  router.get('/', mapper['fetch'](userMappers.fetchSchema, true), userController.all);

  /**
   * Finde user by id.
   *
   * @mapperSchema fetchSchema
   */
  router.get('/:id', mapper['fetch'](userMappers.fetchSchema), userController.find);

  /**
   * Paginate users.
   *
   * @mapperSchema fetchSchema
   */
  router.get('/:page/:perPage', mapper['fetch'](userMappers.fetchSchema, true, true), userController.paginate);

  /**
   * Find all users by the given conditions.
   *
   * @mapperSchema fetchSchema
   */
  router.post('/filter', mapper['fetch'](userMappers.fetchSchema, true), userController.findBy);

  /**
   * Paginate users by the given conditions.
   *
   * @mapperSchema fetchSchema
   */
  router.post('/filter/:page/:perPage', mapper['fetch'](userMappers.fetchSchema, true, true), userController.paginateBy);

  /**
   * Create new user.
   *
   * @mapperSchema    fetchSchema
   * @validationRules insert
   */
  router.post('/', container.userValidationRules('insert'), mapper['request'](userMappers.requestSchema),
      mapper['fetch'](userMappers.fetchSchema), userController.insert);

  /**
   * Update the given user.
   *
   * @mapperSchema    fetchSchema
   * @validationRules insert
   */
  router.put('/', container.userValidationRules('update'), mapper['request'](userMappers.requestSchema),
      mapper['fetch'](userMappers.fetchSchema), userController.update);

  /**
   * Delete the given user.
   *
   * @mapperSchema    fetchSchema
   * @validationRules insert
   */
  router.delete('/:id', userController.delete);

  return router;
};
