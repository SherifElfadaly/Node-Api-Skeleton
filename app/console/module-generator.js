const fs = require('fs');
const noCase = require('no-case');
const pluralize = require('pluralize');
const readline = require('readline');
const exec = require('child_process').exec;

let fileName = '';
let moduleName = process.argv[2] || '';
const tableName = process.argv[3] || moduleName;
const modulesFolderlocation = `${__dirname }/../modules/`;
const tempFolderPath = `${__dirname }/templates/`;
const moduleFolderPath = modulesFolderlocation + moduleName;

moduleName = pluralize.singular(moduleName);
fileName = noCase(moduleName, null, '-');

/**
 * ReadLine interface
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

/**
 * Exit if module name = undefiend
 */
if ( ! moduleName) {
  console.log('please enter module name!');
  process.exit();
}

/**
 * Exit if module already exists
 */
if (fs.existsSync(moduleFolderPath)) {
  console.log('module already exists');
  process.exit();
}

/**
 * Make module folder
 */
fs.mkdirSync(moduleFolderPath);

/**
 * Generate File function for creating module files
 * @param {String} option
 * @param {Function} cb
 */
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

/**
 * creating the -config file
 */
generatFile('-config', (data) => {
  const content = data.replace(new RegExp('replacetoken', 'g'), moduleName);
  return content;
});

/**
 * creating the -controller file
 */
generatFile('-controller', (data) => {
  const controllerName = `${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Controller`;
  const content = data.replace(new RegExp('replacetoken', 'g'), controllerName);
  return content;
});

/**
 * creating the -model file
 */
generatFile('-model', (data) => {
  const modelName = `${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Model`;

  let content = data.replace(new RegExp('replacetoken', 'g'), modelName);
  content = content.replace(new RegExp('databasetoken', 'g'), tableName);

  return content;
});

/**
 * creating the -object file
 */
generatFile('', (data) => {
  const modelName = `${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}`;
  const content = data.replace(new RegExp('replacetoken', 'g'), modelName);
  return content;
});

/**
 * creating the -repository file
 */
generatFile('-repository', (data) => {
  const repoName = `${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}Repository`;
  const content = data.replace(new RegExp('replacetoken', 'g'), repoName);
  return content;
});

/**
 * creating the -validation-rules file
 */
generatFile('-validation-rules', (data) => {
  return data;
});

/**
 * creating the -routes file
 */
generatFile('-routes', (data) => {
  const content = data.replace(new RegExp('replacetoken', 'g'), moduleName);

  return content;
});

/**
 * creating the -provider file
 */
generatFile('-provider', (data) => {
  let content = data.replace(new RegExp('replacetoken', 'g'), moduleName);
  content = content.replace(new RegExp('filenametoken', 'g'), fileName);

  return content;
});

/**
 * Make migrat option
 */
rl.question('Do you want to create the migration file? [yes|no]:  ', (answer) => {
  if (answer == 'no' || answer == 'No' || answer == 'N' || answer == 'n') {
    // if no exit process
    rl.close();
    process.exit();
  } else if (answer == 'yes' || answer == 'Yes' || answer == 'Y' || answer == 'y') {
    rl.question('please enter migration name:  ', (migrationName) => {
      exec(`npm run knex migrate:make ${migrationName}`,
          function(error, stdout, stderr) {
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if (error !== null) {
              console.log(`exec error: ${error}`);
            }
          });
      rl.close();
      process.exit();
    });
  } else {
    // if NOT yes|no exit the process
    console.log('Wrong choice!!');
    rl.close();
    process.exit();
  }
});
