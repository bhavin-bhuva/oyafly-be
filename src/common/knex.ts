import Knex from 'knex';
import knexConfig from '../../knexfile';
const DB_ENV = process.env.DB_ENV ? process.env.DB_ENV : 'dev';

// Set environment from `.env`
const knex = Knex(knexConfig[DB_ENV]);

export default knex;
