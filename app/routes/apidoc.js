module.exports = async (router) => {
  /**
   * Require and promisify fs to use async/await.
   */
  const fs = require('fs');
  const readFile = container.util.promisify(fs.readFile);

  /**
   * Read the content main entry file for all base routes.
   */
  let contents = await readFile(`${__dirname }/index.js`, 'utf8');
  let routes = null;
  let routesFunction = null;
  let docBlock = null;
  let routeBase = null;
  let mapper = null;
  let validationRules = null;
  let apiName = null;
  const endPoints = [];
  const modules = {};

  /**
   * Remove all white spaces from the file content.
   */
  contents = contents.replace(/\s/g, '');

  /**
   * Use substr and split to sperate each route.
   */
  contents = contents.substr(contents.indexOf('app.use(')).split(';');

  /**
   * Remove the last two elements (function curly brackets and semicolon)
   * from the base routes array.
   */
  contents.pop(); contents.pop();

  /**
   * Loop through every base route.
   */
  for (const element of contents) {
    /**
     * Define the start and the end to substr the base route.
     */
    const start = element.indexOf('app.use(\'');
    const end = element.indexOf(',container');

    /**
     * Substr the base route to determine where to the module
     * routes are located.
     */
    const apiBase = element.substr(start + 9, end - 10);
    routeBase = routeBase ? routeBase : apiBase.substr(5);

    /**
     * Retreive the route functio name.
     */
    routes = routes ? routes : element.substr(end + 11, 10);
    routesFunction = routesFunction ? routesFunction : container[routes](router);

    /**
     * Load the module route.
     */
    contents = await readFile(`${__dirname }/../modules/${ routeBase }/${ container.noCase(routes, null, '-') }.js`, 'utf8');

    /**
     * Read jsdoc to determine what mapper and/or validation
     * rules used for each module route.
     */
    if (!docBlock) {
      const Comments = require('parse-comments');
      const comments = new Comments();
      docBlock = comments.parse(contents);
    }

    /**
     * Loop through each module routes.
     */
    routesFunction.stack.forEach((element, index) => {
      /**
       * Only retreive the mapper and/or validation rules
       * if the route has jsdoc.
       */
      if (docBlock[index]) {
        /**
         * Fill the necesseray info based on the jsdoc
         * annotations.
         */
        docBlock[index].tags.forEach((tag) => {
          switch (tag.title) {
            case 'mapperSchema': {
              /**
               * Load the mapper from the corresponding module.
               *
               * @TODO Edit mappers to allow attribute types.
               */
              mapper = require(`../modules/${ routeBase }/${
                require('pluralize').singular(routeBase) }-mappers`)[tag.description];
              break;
            }
            case 'validationRules': {
              /**
               * Load the validatio rules from the corresponding module.
               */
              validationRules = require(`../modules/${ routeBase }/${
                require('pluralize').singular(routeBase) }-validation-rules`).rules[tag.description];
              break;
            }
            case 'apiName': {
              /**
               * Set the api name.
               */
              apiName = tag.description;
              break;
            }
            default:
              break;
          }
        });

        endPoints.push({
          name: apiName,
          path: apiBase + element.route.path,
          params: element.keys,
          method: Object.keys(element.route.methods).shift(),
          description: docBlock[index].description,
          schema: mapper,
          validationRules: validationRules ? require('joi-to-swagger')(validationRules).swagger : false,
        });
      }
    });

    modules[routeBase] = endPoints;
  }

  return {
    modules: modules,
    headers: {
      'Content-Type': 'application/json',
    },
    conditions: [
      {
        'title': 'email equal John@Doe.com:',
        'content': {'email': 'John@Doe.com'},
      },
      {
        'title': 'email equal John@Doe.com and user is blocked:',
        'content': {'and': {'email': 'John@Doe.com', 'blocked': 1}},
      },
      {
        'title': 'email equal John@Doe.com or user is blocked:',
        'content': {'or': {'email': 'John@Doe.com', 'blocked': 1}},
      },
      {
        'title': 'email contain John:',
        'content': {'email': {'op': 'like', 'val': '%John%'}},
      },
      {
        'title': 'user created after 2016-10-25:',
        'content': {'created_at': {'op': '>', 'val': '2016-10-25'}},
      },
      {
        'title': 'user created between 2016-10-20 and 2016-10-25:',
        'content': {'created_at': {'op': 'between', 'val1': '2016-10-20', 'val2': '2016-10-25'}},
      },
      {
        'title': 'user id in 1,2,3:',
        'content': {'id': {'op': 'in', 'val': [1, 2, 3]}},
      },
      {
        'title': 'user name is null:',
        'content': {'name': {'op': 'null'}},
      },
      {
        'title': 'user name is not null:',
        'content': {'name': {'op': 'not null'}},
      },
      {
        'title': 'user has group admin:',
        'content': {'groups': {'op': 'has', 'val': {'name': 'Admin'}}},
      },
    ],
  };
};
