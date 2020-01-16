/**
 * Auth class.
 */
class Auth {
  /**
    * Init new object.
    *
    * @param   {object}  strategy
    *
    * @return  {void}
    */
  constructor(strategy) {
    this.strategy = strategy;
  }

  /**
   * Check for the given credetials.
   *
   * @param   {string}  email
   * @param   {string}  password
   *
   * @return  {string}
   */
  checkCredentials(email, password) {
    return this.strategy.checkCredentials(email, password);
  }

  /**
   * Attemp login.
   *
   * @param   {string}  email
   * @param   {string}  password
   * @param   {string}  platform
   * @param   {boolean} returnUser
   * @param   {boolean} mobile
   *
   * @return  {string}
   */
  async attempt(email, password, platform, returnUser = false) {
    let user = await this.checkCredentials(email, password);
    if (user) {
      const token = await container.jwt.sign({id: user.id}, container.config.app_secret, {expiresIn: container.config.token_expires_in * 60});
      user = await this.userFromToken(token, platform);

      /**
       * Only allow confirmed users.
       */
      if ( ! user.confirmed ) {
        container.errorHandlers.emailNotConfirmed();
      }

      return returnUser ? user : {results: user, meta: {token: token}};
    }

    container.errorHandlers.loginFailed();
  }

  /**
   * Check the user is authnicated.
   *
   * @param   {string}  token
   * @param   {string}  platformKey
   *
   * @return  {object}
   */
  async userFromToken(token, platformKey = '') {
    let user = await this.check(token, platformKey);
    user = await this.getUserScreens(user.id, platformKey);
    user = await this.mapUserRoles(user, user.roles);

    return user;
  }

  /**
   * Check the user is authnicated.
   *
   * @param   {string}  token
   *
   * @return  {object}
   */
  async check(token) {
    /**
     * Verify the jwt token.
     */
    try {
      if (token.startsWith('Bearer ')) token = token.slice(7, token.length);
      return await container.jwt.verify(token, container.config.app_secret);
    } catch (err) {
      container.errorHandlers.unAuthorized();
    }
  }

  /**
   * Map screens for all roles for the given user.
   *
   * @param   {number} id
   * @param   {string} platformKey
   *
   * @return  {string}
   */
  async getUserScreens(id, platformKey = '') {
    /**
     * Get screens for the given platform.
     */
    const platform = await container.platformRepository.first({'platform.key': platformKey}) || {id: 0};
    const screens = await container.screenRepository.findBy({'platform_id': platform.id});

    /**
     * Fetch the user with his roles and permissions.
     *
     * @return  {object}
     */
    const user = await container.userRepository.find(id, {
      'eager': '[roles.[permissions, screenPermissions(filterPlatfrom).screen]]',
      'callback': {
        filterPlatfrom: (builder) => {
          const screenQuery = container.screenPermission.
              relatedQuery('screen').
              whereIn('id', screens.map((screen) => screen.id)).
              orWhereIn('parent_id', screens.map((screen) => screen.id));

          builder.whereExists(screenQuery);
        },
      },
    });
    user.screens = user.screens || {};

    for (let index = 0; index < user.roles.length; index++) {
      const role = user.roles[index];

      /**
       * Map screens for all user roles.
       */
      for (let index = 0; index < role.screenPermissions.length; index++) {
        const screenPermission = role.screenPermissions[index];
        const screen = screenPermission.screen;
        delete screenPermission.screen;

        screen.screenPermissions = screen.screenPermissions || {};
        screen.screenPermissions[screenPermission.id] = screenPermission;

        if (screen.parent_id === null) user.screens[screen.id] = user.screens[screen.id] || screen;
        if (screen.parent_id !== null) {
          user.screens[screen.parent_id] = user.screens[screen.parent_id] || (await container.screenRepository.find(screen.parent_id));
          user.screens[screen.parent_id].subScreens = user.screens[screen.parent_id].subScreens || {};
          user.screens[screen.parent_id].subScreens[screen.id] = screen;
        }
      }

      delete role.screenPermissions;
    }

    /**
     * Convert screens object to array.
     */
    user.screens = Object.values(user.screens);
    user.screens.forEach((screen) => {
      screen.subScreens = screen.subScreens ? Object.values(screen.subScreens) : [];
      screen.screenPermissions = screen.screenPermissions ? Object.values(screen.screenPermissions) : [];

      screen.subScreens.forEach((subScreen) => {
        subScreen.screenPermissions = subScreen.screenPermissions ? Object.values(subScreen.screenPermissions) : [];
      });
    });

    return user;
  }

  /**
   * Map permissions for all the given roles.
   *
   * @param   {object} user
   * @param   {object} roles
   *
   * @return  {string}
   */
  async mapUserRoles(user, roles) {
    for (let index = 0; index < roles.length; index++) {
      const role = roles[index];

      /**
       * Map permissions for all user roles.
       */
      user.permissions = user.permissions || [];
      user.permissions = user.permissions.concat(role.permissions);
      delete role.permissions;

      /**
       * Map assignable roles for all user roles.
       */
      user.assignable_roles = user.assignable_roles || [];
      role.assignable_roles = role.assignable_roles || '';
      user.assignable_roles = user.assignable_roles.concat(role.assignable_roles.split(','));
    }

    return user;
  }

  /**
   * Check if the given user has the given
   * permissions on the given model.
   *
   * @param   {mixed}  user
   * @param   {string} permissionName
   * @param   {string} model
   *
   * @return  {string}
   */
  async can(user, permissionName, model) {
    user = user || {};
    user.permissions = user.permissions || [];
    const permission = user.permissions.find((permission) => {
      return permission.key === permissionName && permission.model === model;
    });

    if ( ! permission) container.errorHandlers.noPermissions();

    return true;
  }
}

module.exports = Auth;
