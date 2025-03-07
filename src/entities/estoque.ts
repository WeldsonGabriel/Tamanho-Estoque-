import { Decimal } from '@prisma/client/runtime/library';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Estoque {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome_produto: string;

  @Column()
  tamanho_pallet: number;

  @Column()
  largura: number;

  @Column()
  comprimento: number;

  @Column()
  altura: Decimal;

  @Column()
  corredor: number;

  @Column()
  saida: number;

  @Column()
  piking: number;

  @Column()
  capacidade_pallet: number;
}

console.log('Entidade Estoque criada com sucesso');