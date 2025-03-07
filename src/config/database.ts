import { DataSource } from 'typeorm';
import { Estoque } from '../models/estoqueModel';

const AppDataSource = new DataSource({
  type: 'mysql',  // Usando MySQL
  host: process.env.DB_HOST,
  port: 3306,  // Porta padrão do MySQL
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Estoque],
  synchronize: true,  // Cria as tabelas automaticamente
  logging: true,
});

export default AppDataSource;
