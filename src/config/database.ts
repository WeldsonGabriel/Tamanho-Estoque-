import { DataSource } from 'typeorm';
import { PrismaClient } from '@prisma/client';
import { Estoque } from '../entities/estoque'; // Ensure that the file exists at this path

const prisma = new PrismaClient();

const AppDataSource = new DataSource({
  type: 'mysql',  // Usando MySQL
  host: process.env.DB_HOST,
  port: 3306,  // Porta padrão do MySQL
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [Estoque],  // Entidades que serão usadas
  synchronize: true,  // Cria as tabelas automaticamente
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
