const userController = container.userController;

module.exports = (router) => {
  /**
   * List all users.
   */
  router.get('/', userController.list);

  /**
   * Finde user by id.
   */
  router.get('/:id', userController.find);

  /**
   * Create new user.
   */
  router.post('/', container.userValidationRules.apply('insert'), userController.insert);

  /**
   * Update the given user.
   */
  router.put('/', container.userValidationRules.apply('update'), userController.update);

  /**
   * Delete the given user.
   */
  router.delete('/:id', userController.delete);

  /**
   * Login using the given credentials.
   */
  router.post('/login', container.userValidationRules.apply('login'), userController.login);

  /**
   * Reset the given user password.
   */
  router.put('/reset/password', container.userValidationRules.apply('resetUserPassword'), userController.resetUserPassword);

  /**
   * Change password for the logged in user.
   */
  router.post('/change/password', container.userValidationRules.apply('changePassword'), userController.changePassword);

  /**
   * Send reset password email.
   */
  router.post('/forgot/password', container.userValidationRules.apply('forgotPassword'), userController.forgotPassword);

  /**
   * Reset password using the forgot token.
   */
  router.post('/reset/password', container.userValidationRules.apply('resetPassword'), userController.resetPassword);

  /**
   * Send confirm email mail.
   */
  router.post('/send/confirm/email', container.userValidationRules.apply('sendConfirmEmail'), userController.sendConfirmEmail);

  /**
   * Update profile.
   */
  router.put('/update/profile', container.userValidationRules.apply('updateProfile'), userController.updateProfile);

  return router;
};
