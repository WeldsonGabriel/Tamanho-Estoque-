# Analizador de Estoque

Este projeto é um analisador de estoque que calcula a quantidade de paletes que podem ser armazenados em um espaço de estoque, levando em consideração a área total disponível, as dimensões do palete e a necessidade de reservar espaços específicos dentro do local, como corredores, áreas de saída e picking.

## Lógica do Cálculo

### Identificação das Variáveis

Você tem as seguintes variáveis envolvidas no cálculo:

- **Tamanho do Local (tamanhoLocal)**: A área total do espaço disponível para armazenar paletes. Essa área é medida em metros quadrados ou em unidades de volume, dependendo de como você quer calcular (por exemplo, metros cúbicos).
- **Tamanho do Palete (tamanhoPalet)**: O espaço que um único palete ocupa. Pode ser em metros quadrados ou metros cúbicos, dependendo da necessidade. Este valor deve ser conhecido para cada tipo de palete utilizado.
- **Espaço Corredor (espacoCorredor)**: O espaço reservado para circulação de pessoas e equipamentos (como empilhadeiras), que deve ser subtraído da área total disponível.
- **Espaço Saída (espacoSaida)**: O espaço reservado para a movimentação de mercadorias para saída. Também deve ser descontado da área total.
- **Espaço Picking (espacoPicking)**: A área destinada à coleta de itens do estoque. Novamente, deve ser descontado da área total.

### Fórmula do Cálculo

Para determinar quantos paletes podem ser armazenados, você utiliza a seguinte fórmula:

```
Espaço Total Utilizável = Tamanho do Local - (Espaço Corredor + Espaço Saída + Espaço Picking)
```

Após calcular o espaço total utilizável, você divide esse valor pelo tamanho do palete:

```
Quantidade de Paletes = Espaço Total Utilizável / Tamanho do Palete
```

Por fim, arredondamos esse valor para baixo, já que você não pode armazenar uma fração de um palete.

### Exemplo de Cálculo

Suponha que você tenha as seguintes informações:

- **Tamanho do Local (tamanhoLocal)**: 1000 metros quadrados (m²)
- **Tamanho do Palete (tamanhoPalet)**: 2 metros quadrados (m²) por palete
- **Espaço Corredor (espacoCorredor)**: 150 metros quadrados
- **Espaço Saída (espacoSaida)**: 100 metros quadrados
- **Espaço Picking (espacoPicking)**: 50 metros quadrados

O cálculo seria:

```
Espaço Total Utilizável = 1000 - (150 + 100 + 50) = 1000 - 300 = 700 m²
Quantidade de Paletes = 700 / 2 = 350 paletes
```

Portanto, você pode armazenar 350 paletes nesse espaço.

### Implementação no Banco de Dados

A cada cálculo realizado, você pode salvar as informações no banco de dados, registrando o nome do produto, as dimensões do palete, os espaços reservados e a quantidade de paletes calculada.

Esse processo permite otimizar o uso do espaço no estoque e é fundamental para uma gestão eficiente da capacidade de armazenamento.
