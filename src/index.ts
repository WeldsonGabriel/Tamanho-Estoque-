import 'reflect-metadata';
import express from 'express';
import { Container } from 'typedi'; // Importando Container do TypeDI
import EstoqueController from './controllers/estoqueController';
import { PrismaClient } from '@prisma/client';
import { calcularEstoque } from './calculoEstoque';

export const app = express();
app.use(express.json());

// Inicializa o Prisma e registra no container
const prisma = new PrismaClient();
Container.set(PrismaClient, prisma);

// Usando TypeDI para pegar o controller com o serviço injetado
const estoqueController = Container.get(EstoqueController);

// Definindo a rota para calcular paletes
app.post('/calcular-paletes', async (req, res) => {
  try {
    await estoqueController.calcularPaletes(req, res);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

async function main() {
  const input = {
    tamanhoLocal: 3000,
    tamanhoPalet: 2,
    espacoCorredor: 450,
    espacoSaida: 300,
    espacoPicking: 150,
    nomeProduto: 'Produto A',
  };

  const quantidadePaletes = await calcularEstoque(input);
  console.log(`Quantidade de paletes que podem ser armazenados: ${quantidadePaletes}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
