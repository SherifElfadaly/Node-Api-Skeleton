const fs = require('fs');
const readline = require('readline');
let taskName = process.argv[2] || '';
const taskFolderlocation = `${__dirname }/../tasks/`;
const taskTempFile = `${__dirname }/templates/taskTemp.js`;


/**
 * ReadLine interface
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});


/**
 * Generate cron file
 */
const generatFile = () => {
  fs.readFile(`${taskTempFile}`, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    const className = taskName.charAt(0).toUpperCase() + taskName.slice(1);
    const content = data.replace(new RegExp('replaceToken', 'g'), className);
    fs.writeFile(`${taskFolderlocation }/${taskName}.js`, content, 'utf8', function(err) {
      if (err) return console.log(err);
      process.exit();
    });
  });
};


if (taskName.length > 0) {
  generatFile();
} else {
  rl.question('please Enter task name : ', (answer) => {
    if (answer.length > 0) {
      taskName = answer;
      generatFile();
      rl.close();
    } else {
      console.log('Wrong choice!!');
      rl.close();
      process.exit();
    }
  });
}


