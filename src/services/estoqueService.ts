import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi'; // Injeção de dependência com TypeDI

@Service() // Decorador para o TypeDI
class EstoqueService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    // Injeção de dependência do Prisma Client
    this.prisma = prisma;
  }

  async calcularPaletes(
    tamanhoLocal: number,
    tamanhoPalet: number,
    espacoCorredor: number,
    espacoSaida: number,
    espacoPicking: number,
    nomeProduto: string // Adicionar o parâmetro nomeProduto
  ): Promise<number> {
    console.log('Iniciando cálculo de paletes', { tamanhoLocal, tamanhoPalet, espacoCorredor, espacoSaida, espacoPicking, nomeProduto });
    const espacoTotal = tamanhoLocal - espacoCorredor - espacoSaida - espacoPicking;
    const quantidadePaletes = Math.floor(espacoTotal / tamanhoPalet);

    // Criar e salvar um novo registro no banco usando Prisma
    await this.prisma.estoque.create({
      data: {
        nome_produto: nomeProduto, // Usar o nome do produto fornecido
        tamanho_pallet: parseFloat(tamanhoPalet.toString()), // Converter para Float
        largura: 2, // Defina conforme necessário
        comprimento: 1, // Defina conforme necessário
        altura: 1.5, // Defina conforme necessário
        corredor: parseFloat(espacoCorredor.toString()), // Converter para Float
        saida: parseFloat(espacoSaida.toString()), // Converter para Float
        piking: parseFloat(espacoPicking.toString()), // Converter para Float
        capacidade_pallet: quantidadePaletes,
      },
    });

    console.log('Cálculo de paletes concluído', { quantidadePaletes });
    return quantidadePaletes;
  }
}

export default EstoqueService;
