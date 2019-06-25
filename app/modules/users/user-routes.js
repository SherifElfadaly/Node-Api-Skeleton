const userController = container.userController;
const asyncWrapper = container.asyncWrapper;

module.exports = (router) => {
  router.get('/', asyncWrapper(userController.all));
  router.get('/:id', userController.find);
  router.post('/', container.validator.body(container.userValidationRules.insert), userController.insert);

  return router;
};
