import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return Promise.all([await knex.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)]);
}

export async function down(_knex: Knex): Promise<void> {}
