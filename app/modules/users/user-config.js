module.exports = {
  'user': {
    'relations': {
      'list': '[]',
      'find': '[roles]',
    },
    'allowedRelations': {
      'insert': '[]',
      'update': '[]',
    },
    'upsertOptions': {
      'insert': {relate: true, unrelate: true},
      'update': {relate: true, unrelate: true, noDelete: true},
      'assignRole': {relate: true, unrelate: true, noDelete: true},
      'resetUserPassword': {relate: true, unrelate: true, noDelete: true},
      'updateProfile': {relate: true, unrelate: true, noDelete: true},
    },
  },
};
