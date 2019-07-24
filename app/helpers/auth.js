/**
 * Auth class.
 */
class Auth {
  /**
   * Init new object.
   *
   * @param   {object}  Strategy
   *
   * @return  {void}
   */
  constructor(Strategy) {
    container.passport.use(new Strategy(
        async (email, password, done) => {
          const user = await container.userRepository.first({email: email});

          if ( ! user) return done(null, false);
          if ( ! await user.verifyPassword(password) ) return done(null, false);

          return done(null, user);
        }
    ));
  }

  /**
   * Apply authentication.
   *
   * @param   {object}  cb
   *
   * @return  {object}
   */
  apply(cb) {
    container.passport.authenticate('basic', {session: false});

    return cb;
  }
}

module.exports = Auth;
