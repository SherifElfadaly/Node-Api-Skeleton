module.exports = {
  'role': {
    'relations': {
      'list': '[]',
      'find': '[screenPermissions.permission]',
    },
    'allowedRelations': {
      'insert': '[]',
      'update': '[]',
    },
    'upsertOptions': {
      'insert': {relate: true, unrelate: true},
      'update': {relate: true, unrelate: true, noDelete: true},
      'assignScreenPermission': {relate: true, unrelate: true, noDelete: true},
    },
  },
};
