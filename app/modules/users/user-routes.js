const userController = container.userController;
const asyncWrapper=container.asyncWrapper;

module.exports = (router) => {
  // NOTE for routes exception handling wrappe the controller in the asyncWrapper()
  router.get('/all', asyncWrapper(userController.all));
  // router.get('/all', userController.all);

  router.get('/find/:id', userController.find);
  return router;
};
