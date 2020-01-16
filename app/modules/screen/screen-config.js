module.exports = {
  'screen': {
    'relations': {
      'list': '[subScreens.screenPermissions.permission, screenPermissions.permission]',
      'find': '[]',
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
