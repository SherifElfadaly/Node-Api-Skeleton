/**
 * ErrorHandler class.
 */
class ErrorHandler {
  /**
   * Throw 404 not found exception.
   *
   * @param   {string}  name
   *
   * @return  {void}
   */
  notFound(name = '') {
    const err = new Error(`${name} not found`);
    err.statusCode = 404;

    throw err;
  }

  /**
   * Throw 400 login failed exceprion.
   *
   * @return  {void}
   */
  loginFailed() {
    const err = new Error(`Wrong credentials`);
    err.statusCode = 400;

    throw err;
  }

  /**
   * Throw 401 unAuthorized exceprion.
   *
   * @return  {void}
   */
  unAuthorized() {
    const err = new Error(`Please login before any action`);
    err.statusCode = 401;

    throw err;
  }
}

module.exports = ErrorHandler;
