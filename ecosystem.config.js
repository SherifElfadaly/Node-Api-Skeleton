module.exports = {
  apps: [{
    name: 'Skeleton',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
  }],
};
