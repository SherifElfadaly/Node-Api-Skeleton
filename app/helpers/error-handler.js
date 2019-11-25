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
   * Throw 400 login failed exception.
   *
   * @return  {void}
   */
  loginFailed() {
    const err = new Error(`Wrong credentials`);
    err.statusCode = 400;

    throw err;
  }

  /**
   * Throw 401 unauthorized exception.
   *
   * @return  {void}
   */
  unAuthorized() {
    const err = new Error(`Please login before any action`);
    err.statusCode = 401;

    throw err;
  }

  /**
   * Throw 403 no permissions exception.
   *
   * @return  {void}
   */
  noPermissions() {
    const err = new Error(`No permissions`);
    err.statusCode = 403;

    throw err;
  }

  /**
   * Throw 422 field already exists.
   *
   * @param   {string}  name
   *
   * @return  {void}
   */
  alreadyExists(name = '') {
    const err = new Error(`${name} already exists`);
    err.statusCode = 422;

    throw err;
  }

  /**
   * Throw 422 field doesn't exists.
   *
   * @param   {string}  name
   *
   * @return  {void}
   */
  doesnotExists(name = '') {
    const err = new Error(`${name} doesn't exists`);
    err.statusCode = 422;

    throw err;
  }

  /**
   * Throw 400 wrong version.
   *
   * @param   {string}  name
   *
   * @return  {void}
   */
  wrongVersion(name = '') {
    const err = new Error(`wrong version`);
    err.statusCode = 400;

    throw err;
  }
}

module.exports = ErrorHandler;
