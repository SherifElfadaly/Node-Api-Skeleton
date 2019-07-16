const bodyParser = container.bodyParser;

module.exports = (app) => {
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
};
