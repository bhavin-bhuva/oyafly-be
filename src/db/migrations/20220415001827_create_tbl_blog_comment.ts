import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tbl_blog_comments', (table: Knex.TableBuilder) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name');
    table.string('email');
    table.text('comment');
    table.uuid('blog_id').references('id').inTable('tbl_blogs').onDelete('CASCADE');
    table.uuid('user_id').references('id').inTable('tbl_users').onDelete('CASCADE');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tbl_blogs');
}
