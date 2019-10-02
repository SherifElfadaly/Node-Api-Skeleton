const cors = require('cors');

module.exports = (app)=>{
  app.use(cors({
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'optionsSuccessStatus': 204,
    'allowedHeaders': 'Content-Type, Authorization',
    // 'allowedHeaders': 'Origin, X-Requested-Width, X-Custom-Header, Content-Type, Accept, Authorization, errorcode, errormessage, server-name',

  }));
};
