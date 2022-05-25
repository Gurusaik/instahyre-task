
const bookshelf = require('../bookshelf');

const User = bookshelf.model('User', {
    tableName: 'users_table'
  })

module.exports = User;
