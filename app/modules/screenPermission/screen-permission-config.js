module.exports = {
  'screenPermission': {
    'relations': {
      'list': '[permission]',
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
