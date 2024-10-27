import {
  MariaDbDriver,
  Options,
  ReflectMetadataProvider,
} from '@mikro-orm/mariadb';
import * as dotenv from 'dotenv';
import * as process from 'process';
dotenv.config();

const configMikroOrm: Options = {
  dbName: process.env.DATABASE,
  driver: MariaDbDriver,
  entitiesTs: ['./src/**/entities/**.entity.ts'],
  entities: ['./dist/**/entities/**.entity.js'],
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  metadataProvider: ReflectMetadataProvider,
  migrations: {
    path: './src/db/migrations',
  },
};
export default configMikroOrm;