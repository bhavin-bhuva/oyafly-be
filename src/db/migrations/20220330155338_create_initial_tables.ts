import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return Promise.all([
    await knex.schema.createTable('tbl_roles', (table: Knex.TableBuilder) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('name').notNullable();
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('deleted_at');
    }),
    await knex.schema.createTable('tbl_users', (table: Knex.TableBuilder) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('full_name');
      table.string('username');
      table.string('email');
      table.string('password').notNullable();
      table.string('profile_url');
      table.string('reset_hash');
      table.uuid('role_id').references('id').inTable('tbl_roles').onDelete('SET NULL');
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('deleted_at');
    }),
    await knex.schema.createTable('tbl_inquiries', (table: Knex.TableBuilder) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('name');
      table.string('surname');
      table.string('comment');
      table.string('email');
      table.string('department');
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('deleted_at');
    }),
  ]);
}

export async function down(knex: Knex): Promise<any> {
  return Promise.all([
    knex.schema.dropTable('tbl_inquiries'),
    knex.schema.dropTable('tbl_users'),
    await knex.schema.dropTable('tbl_roles'),
  ]);
}
