const fs = require('fs');
module.exports = (router) => {
  router.get('/:date?', (req, res, next) => {
    /**
     *  Set log File Name
     */
    const now = new Date();
    const fileName = (req.params.date) ? `${req.params.date}.log` : `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}.log`;
    const filePath = `${__dirname}/../../logs/${fileName}`;

    /**
     * Open Log file
     */
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        err.message = `ENOENT: NO log file for that date!`;
        return next(err);
      }
      res.send(`<pre>${data}</pre>`);
    });
  });

  return router;
};
