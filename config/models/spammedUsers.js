
const bookshelf = require('../bookshelf');

const SpammedUsers = bookshelf.model('SpammedUsers', {
    tableName: 'spammed_users'
  })

module.exports = SpammedUsers;
