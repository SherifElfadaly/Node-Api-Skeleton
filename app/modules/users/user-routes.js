const userController = container.userController;

module.exports = (router) => {
  router.get('/all', userController.all);
  router.get('/find/:id', userController.find);
  return router;
};
