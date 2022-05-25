'use strict';
exports.up = function(knex) {
    return knex.schema
      .createTable('users_table', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('phone_number').notNullable().unique();
        table.string('email_address');
        table.timestamps(true, true);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('users_table');
  };