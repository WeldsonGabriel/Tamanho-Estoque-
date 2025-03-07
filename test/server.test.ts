// src/tests/servidor.test.ts
import request from 'supertest';
import { app } from '../src/index';
import { normalize } from 'path';

describe('Testando o servidor Express', () => {
  it('Deve responder com status 200 para a rota /calcular-paletes', async () => {
    const response = await request(app)
      .post('/calcular-paletes')
      .send({
        tamanhoLocal: 3000,
        tamanhoPalet: 2,
        espacoCorredor: 450,
        espacoSaida: 300,
        espacoPicking: 150,
        nomeProduto: 'Produto A',
      });
    expect(response.status).toBe(200);
    expect(response.body.quantidadePaletes).toBe(8); // Espera-se que caibam 8 paletes
  });

  it('Deve retornar erro 400 se os dados estiverem incompletos', async () => {
    const response = await request(app)
      .post('/calcular-paletes')
      .send({
        tamanhoLocal: 3000,
        tamanhoPalet: 450,
        espacoCorredor: 300,
        espacoPicking: 150,
        nomeProduto: 'Produto A',
      });
    expect(response.status).toBe(400); // Espera-se erro 400 devido à falta de espacoSaida
  });
});
