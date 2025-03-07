import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { Container } from 'typedi';
import EstoqueController from './controllers/estoqueController';
import EstoqueService from './services/estoqueService'; // Importar EstoqueService
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

export const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Configurando o CORS para permitir requisições da porta 5173

const prisma = new PrismaClient();
Container.set(PrismaClient, prisma);

// Registrar EstoqueService no container
Container.set('estoqueService', new EstoqueService(prisma));

const estoqueController = Container.get(EstoqueController);

app.post('/calcular-paletes', async (req, res) => {
  console.log('Recebendo requisição POST /calcular-paletes', req.body);
  try {
    await estoqueController.calcularPaletes(req, res);
  } catch (error) {
    console.error('Erro no endpoint /calcular-paletes', error);
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

