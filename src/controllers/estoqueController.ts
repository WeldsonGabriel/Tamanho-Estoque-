import { Request, Response } from 'express';
import { Service, Inject } from 'typedi'; // Injeção de dependência com TypeDI
import EstoqueService from '../services/estoqueService';

@Service() // Decorador do TypeDI
class EstoqueController {
  private estoqueService: EstoqueService;

  constructor(@Inject('estoqueService') estoqueService: EstoqueService) {
    this.estoqueService = estoqueService;
  }

  async calcularPaletes(req: Request, res: Response) {
    console.log('Recebendo requisição para calcular paletes', req.body);
    const { tamanhoLocal, tamanhoPalet, espacoCorredor, espacoSaida, espacoPicking, nomeProduto } = req.body;

    try {
      const quantidadePaletes = await this.estoqueService.calcularPaletes(
        parseFloat(tamanhoLocal), // Converter para Float
        parseFloat(tamanhoPalet), // Converter para Float
        parseFloat(espacoCorredor), // Converter para Float
        parseFloat(espacoSaida), // Converter para Float
        parseFloat(espacoPicking), // Converter para Float
        nomeProduto // Passar o nome do produto para o serviço
      );

      console.log('Resposta de cálculo de paletes', { quantidadePaletes });
      return res.status(200).json({ quantidadePaletes });
    } catch (error) {
      console.error('Erro ao calcular o número de paletes', error);
      return res.status(500).json({ message: 'Erro ao calcular o número de paletes', error });
    }
  }
}

export default EstoqueController;
