module.exports = {
  'permission': {
    'relations': {
      'all': '[]',
      'find': '[]',
      'findBy': '[]',
      'paginate': '[]',
      'paginateBy': '[]',
    },
    'allowedRelations': {
      'insert': '[]',
      'update': '[]',
    },
    'upsertOptions': {
      'insert': {relate: true, unrelate: true},
      'update': {relate: true, unrelate: true, noUpdate: true, noDelete: true},
    },
  },
};
