import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    tamanhoLocal: '',
    tamanhoPalet: '',
    espacoCorredor: '',
    espacoSaida: '',
    espacoPicking: '',
    nomeProduto: '',
  });

  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enviando dados do formulário', formData);
    try {
      const res = await axios.post('http://localhost:3000/calcular-paletes', formData);
      console.log('Resposta recebida do servidor', res.data);
      setResponse(`Quantidade de paletes: ${res.data.quantidadePaletes}`);
      setError('');
    } catch (err) {
      console.error('Erro ao enviar dados do formulário', err);
      setError('Erro ao calcular o número de paletes');
      setResponse('');
    }
  };

  return (
    <div className="container">
      <h1>Bem-vindo ao Analizador de Estoque</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="tamanhoLocal"
          placeholder="Tamanho Local (ex: 1500)"
          value={formData.tamanhoLocal}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="tamanhoPalet"
          placeholder="Tamanho Palet (ex: 1.5)"
          value={formData.tamanhoPalet}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="espacoCorredor"
          placeholder="Espaço Corredor (ex: 20)"
          value={formData.espacoCorredor}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="espacoSaida"
          placeholder="Espaço Saída (ex: 20)"
          value={formData.espacoSaida}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="espacoPicking"
          placeholder="Espaço Picking (ex: 20)"
          value={formData.espacoPicking}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="nomeProduto"
          placeholder="Nome Produto (ex: Leite)"
          value={formData.nomeProduto}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="button">Calcular</button>
      </form>
      {response && <p className="response">{response}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default App;
