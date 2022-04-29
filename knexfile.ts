interface KnexConfig {
  [key: string]: object;
}

const knexConfig: KnexConfig = {
  local: {
    client: 'postgresql',
    connection: {
      database: 'oyafly',
      user: 'postgres',
      password: 'postgres',
      port: 5432,
    },
    pool: {
      min: 1,
      max: 2,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/src/db/migrations',
    },
    seeds: {
      directory: __dirname + '/src/db/seeders',
    },
    debug: true,
  },
  localDev: {
    client: 'postgresql',
    connection: {
      database: 'oyafly',
      user: 'postgres',
      password: 'Af2wkgpKAHduAx9M',
      port: 5434,
    },
    pool: {
      min: 1,
      max: 2,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/src/db/migrations',
    },
    seeds: {
      directory: __dirname + '/src/db/seeders',
    },
    debug: true,
  },
  dev: {
    client: 'postgresql',
    connection: {
      host: '00.00.00.00',
      database: 'oyafly',
      user: 'postgres',
      password: 'Af2wkgpKAHduAx9M',
      port: 5432,
    },
    pool: {
      min: 1,
      max: 1,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/src/db/migrations',
    },
    seeds: {
      directory: __dirname + '/src/db/seeders',
    },
  },
  prod: {
    client: 'postgresql',
    connection: {
      host: '00.00.00.00',
      database: 'oyafly',
      user: 'postgres',
      password: 'aj4zuvMGtw9x4Khx',
    },
    pool: {
      min: 1,
      max: 1,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/src/db/migrations',
    },
    seeds: {
      directory: __dirname + '/src/db/seeders',
    },
  },
};

export default knexConfig;
