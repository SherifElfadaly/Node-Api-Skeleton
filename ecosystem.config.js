module.exports = {
  apps: [{
    name: 'API Skeleton',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
  }],
};
