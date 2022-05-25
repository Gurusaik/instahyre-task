'use strict';
exports.up = function(knex) {
    return knex.schema
      .createTable('spammed_users', function(table) {
        table.increments('id').primary();
        table.string('phone_number').notNullable().unique();
        table.integer('spam_count')
        table.timestamps(true, true);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('spammed_users');
  };