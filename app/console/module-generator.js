const fs = require('fs');
const noCase = require('no-case');
const pluralize = require('pluralize');

let fileName = '';
let moduleName = process.argv[2] || '';
const tableName = process.argv[3] || '';
const modulesFolderlocation = `${__dirname }/../modules/`;
const tempFolderPath = `${__dirname }/templates/`;
const moduleFolderPath = modulesFolderlocation + moduleName;

moduleName = pluralize.singular(moduleName);
fileName = noCase(moduleName, null, '-');

if ( ! moduleName) {
  console.log('please enter module name!');
  process.exit();
}

if (fs.existsSync(moduleFolderPath)) {
  console.log('module already exists');
  process.exit();
}

fs.mkdirSync(moduleFolderPath);

const generatFile = (option, cb) => {
  const filename = `replacetoken${option}`;
  fs.readFile(`${tempFolderPath}${filename}.js`, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    const content = cb(data);

    fs.writeFile(`${moduleFolderPath }/${fileName}${option}.js`, content, 'utf8', function(err) {
      if (err) return console.log(err);
    });
  });
};

generatFile('-config', (data) => {
  const content = data.replace(new RegExp('replacetoken', 'g'), moduleName);
  return content;
});

generatFile('-controller', (data) => {
  const controllerName = `${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Controller`;
  const content = data.replace(new RegExp('replacetoken', 'g'), controllerName);
  return content;
});

generatFile('-model', (data) => {
  const modelName = `${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Model`;

  let content = data.replace(new RegExp('replacetoken', 'g'), modelName);
  content = content.replace(new RegExp('databasetoken', 'g'), tableName ? tableName : modelName);

  return content;
});

generatFile('-repository', (data) => {
  const repoName = `${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Repository`;
  const content = data.replace(new RegExp('replacetoken', 'g'), repoName);
  return content;
});

generatFile('-validation-rules', (data) => {
  return data;
});

generatFile('-routes', (data) => {
  const content = data.replace(new RegExp('replacetoken', 'g'), moduleName);

  return content;
});

generatFile('-provider', (data) => {
  let content = data.replace(new RegExp('replacetoken', 'g'), moduleName);
  content = content.replace(new RegExp('filenametoken', 'g'), fileName);

  return content;
});
