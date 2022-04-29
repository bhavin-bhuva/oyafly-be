import { Knex } from 'knex';
import bycrpt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  let roleAdmin: any | undefined = undefined;
  let roleUser: any | undefined = undefined;

  // inserting roles
  await knex('tbl_roles').insert([{ name: 'admin' }, { name: 'user' }]);

  roleAdmin = await knex('tbl_roles').select('id').where({ name: 'admin' }).first();
  roleUser = await knex('tbl_roles').select('id').where({ name: 'user' }).first();

  const bulkInsertUser = [
    {
      full_name: 'admin oyafly',
      username: 'admin',
      email: 'admin@oyafly.com',
      role_id: roleAdmin.id,
      password: bycrpt.hashSync('sample', 10),
    },
    {
      full_name: 'Jhon Doe',
      username: 'jhondoe',
      email: 'jhondoe@oyafly.com',
      role_id: roleUser.id,
      password: bycrpt.hashSync('sample', 10),
    },
  ];

  // inserting users
  await knex('tbl_users').insert(bulkInsertUser);
}
