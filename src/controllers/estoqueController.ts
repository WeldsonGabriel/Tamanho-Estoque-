import { Request, Response } from 'express';
import { Service } from 'typedi'; // Injeção de dependência com TypeDI
import EstoqueService from '../services/estoqueService';

@Service() // Decorador do TypeDI
class EstoqueController {
  private estoqueService: EstoqueService;

  constructor(estoqueService: EstoqueService) {
    this.estoqueService = estoqueService;
  }

  async calcularPaletes(req: Request, res: Response) {
    const { tamanhoLocal, tamanhoPalet, espacoCorredor, espacoSaida, espacoPicking } = req.body;

    try {
      const quantidadePaletes = await this.estoqueService.calcularPaletes(
        tamanhoLocal,
        tamanhoPalet,
        espacoCorredor,
        espacoSaida,
        espacoPicking
      );

      return res.status(200).json({ quantidadePaletes });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao calcular o número de paletes', error });
    }
  }
}

export default EstoqueController;
