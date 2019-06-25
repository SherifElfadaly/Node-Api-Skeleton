const userController = container.userController;

module.exports = (router) => {
  router.get('/', userController.all);
  router.get('/:id', userController.find);
  router.delete('/:id', userController.delete);
  router.post('/', container.userValidationRules('insert'), userController.insert);
  router.get('/restore/:id', userController.restore);

  return router;
};
