const userController = container.userController;

module.exports = (router) => {
  router.get('/', userController.all);
  router.get('/:id', userController.find);
  router.post('/', container.userValidationRules('insert'), userController.insert);

  return router;
};
