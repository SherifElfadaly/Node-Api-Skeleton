const fs = require('fs');
const cronFilePath = '/etc/cron.d/crons';
module.exports.exec = (isCron)=>{
  /**
   * collect taskSChedule
   */
  const taskSchedule = [];
  /**
   * Init all cron Task .
   */
  container.glob.sync(`${__dirname}/../tasks/*`).forEach((taskFile) => {
    const Task = require(`${taskFile}`);
    cronTasks[Task.name] = Task;
    taskSchedule.push(new Task());
  });

  if (!isCron) {
  /**
   * Generate crontab file
   */
    const data = jsonToString(taskSchedule);

    /**
   * write the generated data to the cron file
   */
    fs.writeFile(cronFilePath, data, (err)=>{
      console.log(err);
    });
  }
};

/**
 * constract the cron file format
 * @param {Array} tasks
 * @return {string}
 */
const jsonToString = (tasks)=>{
  let data = '';
  /**
   * collect tasks string
   */
  tasks.forEach((task)=>{
    data = `${data}${task.time} ${task.user} ${task.job}\n`;
  });
  return data;
};
