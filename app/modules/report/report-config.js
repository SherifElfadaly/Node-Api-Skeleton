module.exports = {
  'report': {
    'relations': {
      'list': '[]',
      'find': '[]',
      'roles_count': '[role]',
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
