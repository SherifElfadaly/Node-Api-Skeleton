const Logger=container.logger;

/**
 * @param {CallableFunction} cb Controller body
 * @return {function (req,res,next)}  exception free controller logic as a function
 * Router exception handler wrapper
 */
module.exports.asyncWrapper = (cb) => {
  return (req, res, next) => {
    try {
      const wrappedRoute = cb(req, res, next);
      if (wrappedRoute.catch) {
        wrappedRoute.catch((err) => {
          next(err);
        });
      }
    } catch (err) {
      next(err);
    }
  };
};

/**
 * @param {object} app express object
 * Error handling middleWare
 */
module.exports.errHandler = (app) => {
  app.use((err, req, res, next) => {
    const statusCode=err.statusCode || 500;
    const exceptionBody=err.response || err.message || 'Unidentified Error';

    Logger.log('error', statusCode+' '+exceptionBody);
    res.status(err.statusCode || 500).json({message: err.response || err.message || 'Unidentified Error'});
  });
};

