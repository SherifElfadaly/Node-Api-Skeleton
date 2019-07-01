/**
 * ErrorHandler class.
 */
class ErrorHandler {
  /**
     * Throw 404 not found exceprion.
     *
     * @param   {string}  name
     *
     * @return  {void}
     */
  notFound(name = '') {
    const err = new Error(name + ' not found');
    err.statusCode = 404;

    throw err;
  }
}

module.exports = ErrorHandler;
