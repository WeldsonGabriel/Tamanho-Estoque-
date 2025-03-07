import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CalculoEstoqueInput {
  tamanhoLocal: number;
  tamanhoPalet: number;
  espacoCorredor: number;
  espacoSaida: number;
  espacoPicking: number;
  nomeProduto: string;
}

async function calcularEstoque(input: CalculoEstoqueInput) {
  const { tamanhoLocal, tamanhoPalet, espacoCorredor, espacoSaida, espacoPicking, nomeProduto } = input;

  const espacoTotalUtilizavel = tamanhoLocal - (espacoCorredor + espacoSaida + espacoPicking);
  const quantidadePaletes = Math.floor(espacoTotalUtilizavel / tamanhoPalet);

  await prisma.estoque.create({
    data: {
      nome_produto: nomeProduto,
      tamanho_pallet: tamanhoPalet,
      largura: 2,
      comprimento: 1,
      altura: 1,
      corredor: espacoCorredor,
      saida: espacoSaida,
      piking: espacoPicking,
      capacidade_pallet: quantidadePaletes,
    },
  });

  console.log(`Quantidade de paletes calculada: ${quantidadePaletes}`);
  return quantidadePaletes;
}

export { calcularEstoque };
