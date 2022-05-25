const knex = require('knex')({
    client: 'mysql',
    connection: {
      host     : '127.0.0.1',
      user     : 'root',
      password : 'mysqlpassword',
      database : 'instahyre',
      charset  : 'utf8'
    }
  });
  
  bookshelf = require('bookshelf')(knex);
  
  module.exports = bookshelf;