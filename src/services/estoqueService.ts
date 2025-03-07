import { PrismaClient } from '@prisma/client';
import { Service, Inject } from 'typedi'; // Injeção de dependência com TypeDI

@Service() // Decorador para o TypeDI
class EstoqueService {
  private prisma: PrismaClient;

  constructor() {
    // Injeção de dependência do Prisma Client
    this.prisma = Inject('prisma') as unknown as PrismaClient;
  }

  async calcularPaletes(
    tamanhoLocal: number,
    tamanhoPalet: number,
    espacoCorredor: number,
    espacoSaida: number,
    espacoPicking: number
  ): Promise<number> {
    const espacoTotal = tamanhoLocal - espacoCorredor - espacoSaida - espacoPicking;
    const quantidadePaletes = Math.floor(espacoTotal / tamanhoPalet);

    // Criar e salvar um novo registro no banco usando Prisma
    await this.prisma.estoque.create({
      data: {
        nome_produto: 'Produto Exemplo',
        tamanho_pallet: tamanhoPalet,
        largura: 2, // Defina conforme necessário
        comprimento: 1, // Defina conforme necessário
        altura: 1, // Defina conforme necessário
        corredor: espacoCorredor,
        saida: espacoSaida,
        piking: espacoPicking,
        capacidade_pallet: quantidadePaletes,
      },
    });

    return quantidadePaletes;
  }
}

export default EstoqueService;
