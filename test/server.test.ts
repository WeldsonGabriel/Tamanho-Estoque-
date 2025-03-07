// src/tests/servidor.test.ts
import request from 'supertest';
import { app } from '../src/index';

describe('Testando o servidor Express', () => {
  it('Deve responder com status 200 para a rota /calcular-paletes', async () => {
    const response = await request(app)
      .post('/calcular-paletes')
      .send({
        tamanhoLocal: 100,
        tamanhoPalet: 10,
        espacoCorredor: 10,
        espacoSaida: 5,
        espacoPicking: 5,
      });
    expect(response.status).toBe(200);
    expect(response.body.quantidadePaletes).toBe(8); // Espera-se que caibam 8 paletes
  });

  it('Deve retornar erro 400 se os dados estiverem incompletos', async () => {
    const response = await request(app)
      .post('/calcular-paletes')
      .send({
        tamanhoLocal: 100,
        tamanhoPalet: 10,
        espacoCorredor: 10,
        espacoPicking: 5,
      });
    expect(response.status).toBe(400); // Espera-se erro 400 devido à falta de espacoSaida
  });
});
