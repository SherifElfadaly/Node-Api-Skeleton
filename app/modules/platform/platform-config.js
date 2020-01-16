module.exports = {
  'platform': {
    'relations': {
      'list': '[]',
      'find': '[screens.[subScreens.screenPermissions.permission, screenPermissions.permission]]',
    },
    'allowedRelations': {
      'insert': '[]',
      'update': '[]',
    },
    'upsertOptions': {
      'insert': {relate: true, unrelate: true},
      'update': {relate: true, unrelate: true, noDelete: true},
    },
  },
};
