const userController = container.userController;
const userMappers = container.userMappers;
const mapper = container.mapper;

module.exports = (router) => {
  router.get('/', mapper['fetch'](userMappers.fetchSchema, true), userController.all);
  router.get('/:id', mapper['fetch'](userMappers.fetchSchema), userController.find);
  router.get('/:page/:perPage', mapper['fetch'](userMappers.fetchSchema, true, true), userController.paginate);

  router.post('/filter', mapper['fetch'](userMappers.fetchSchema, true), userController.findBy);
  router.post('/filter/:page/:perPage', mapper['fetch'](userMappers.fetchSchema, true, true), userController.paginateBy);
  router.post('/', container.userValidationRules('insert'), mapper['request'](userMappers.requestSchema),
      mapper['fetch'](userMappers.fetchSchema), userController.insert);

  router.delete('/:id', userController.delete);
  router.put('/', container.userValidationRules('update'), mapper['request'](userMappers.requestSchema),
      mapper['fetch'](userMappers.fetchSchema), userController.update);

  return router;
};
